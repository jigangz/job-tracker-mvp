from __future__ import annotations

import uuid
from datetime import date, datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel


class StatusEnum(str, Enum):
    applied = "applied"
    phone_screen = "phone_screen"
    interview = "interview"
    offer = "offer"
    rejected = "rejected"


class JobCreate(BaseModel):
    company: str
    role: str
    link: Optional[str] = None
    status: StatusEnum = StatusEnum.applied
    applied_date: date
    notes: Optional[str] = None


class JobUpdate(BaseModel):
    company: Optional[str] = None
    role: Optional[str] = None
    link: Optional[str] = None
    status: Optional[StatusEnum] = None
    applied_date: Optional[date] = None
    notes: Optional[str] = None


class JobRead(BaseModel):
    id: uuid.UUID
    company: str
    role: str
    link: Optional[str]
    status: StatusEnum
    applied_date: date
    notes: Optional[str]
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class JobStats(BaseModel):
    applied: int = 0
    phone_screen: int = 0
    interview: int = 0
    offer: int = 0
    rejected: int = 0
    total: int = 0
