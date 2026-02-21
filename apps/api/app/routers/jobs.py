from __future__ import annotations

import uuid
from typing import List, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, or_
from sqlalchemy.orm import Session

from app.core.deps import get_current_user
from app.db.session import get_db
from app.models.job import JobApplication
from app.models.user import User
from app.schemas.job import JobCreate, JobRead, JobStats, JobUpdate, StatusEnum

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.get("", response_model=List[JobRead])
def list_jobs(
    status_filter: Optional[StatusEnum] = Query(None, alias="status"),
    q: Optional[str] = Query(None, min_length=1, max_length=200),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = db.query(JobApplication).filter(
        JobApplication.user_id == current_user.id
    )

    if status_filter:
        query = query.filter(JobApplication.status == status_filter.value)

    if q:
        pattern = f"%{q}%"
        query = query.filter(
            or_(
                JobApplication.company.ilike(pattern),
                JobApplication.role.ilike(pattern),
                JobApplication.notes.ilike(pattern),
            )
        )

    return query.order_by(JobApplication.applied_date.desc()).all()


@router.get("/stats", response_model=JobStats)
def job_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    rows = (
        db.query(JobApplication.status, func.count())
        .filter(JobApplication.user_id == current_user.id)
        .group_by(JobApplication.status)
        .all()
    )
    counts = {s: c for s, c in rows}
    total = sum(counts.values())
    return JobStats(
        applied=counts.get("applied", 0),
        phone_screen=counts.get("phone_screen", 0),
        interview=counts.get("interview", 0),
        offer=counts.get("offer", 0),
        rejected=counts.get("rejected", 0),
        total=total,
    )


@router.post("", response_model=JobRead, status_code=status.HTTP_201_CREATED)
def create_job(
    body: JobCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    job = JobApplication(
        user_id=current_user.id,
        company=body.company,
        role=body.role,
        link=body.link,
        status=body.status.value,
        applied_date=body.applied_date,
        notes=body.notes,
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


@router.get("/{job_id}", response_model=JobRead)
def get_job(
    job_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    job = db.get(JobApplication, job_id)
    if not job or job.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@router.put("/{job_id}", response_model=JobRead)
def update_job(
    job_id: uuid.UUID,
    body: JobUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    job = db.get(JobApplication, job_id)
    if not job or job.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Job not found")

    update_data = body.model_dump(exclude_unset=True)
    if "status" in update_data and update_data["status"] is not None:
        update_data["status"] = update_data["status"].value

    for field, value in update_data.items():
        setattr(job, field, value)

    db.commit()
    db.refresh(job)
    return job


@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job(
    job_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    job = db.get(JobApplication, job_id)
    if not job or job.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Job not found")
    db.delete(job)
    db.commit()
