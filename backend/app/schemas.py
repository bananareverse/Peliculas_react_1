from pydantic import BaseModel
from typing import List, Optional
from datetime import date

# --- Esquemas “simples” para anidar sin ciclos ---

class PersonajeOut(BaseModel):
    id: int
    nombre: str
    descripcion: str
    imagen: Optional[str] = None

    class Config:
        orm_mode = True

class PeliculaOut(BaseModel):
    id: int
    nombre: str
    clasificacion: str
    fecha_estreno: date
    resena: str
    temporada: Optional[str] = None
    imagen: Optional[str] = None

    class Config:
        orm_mode = True


# --- Esquemas base y de creación ---

class PeliculaBase(BaseModel):
    nombre: str
    clasificacion: str
    fecha_estreno: date
    resena: str
    temporada: Optional[str] = None
    imagen: Optional[str] = None
    personajes_ids: Optional[List[int]] = []    # <<< Asegúrate de tener este campo

class PeliculaCreate(PeliculaBase):
    pass

class PeliculaOut(PeliculaBase):
    id: int
    personajes: List["PersonajeOut"] = []      # Sólo para salida
    class Config:
        orm_mode = True


class PersonajeBase(BaseModel):
    nombre: str
    descripcion: str
    imagen: Optional[str] = None

class PersonajeCreate(PersonajeBase):
    pass


# --- Esquemas de respuesta compuestos ---

class PeliculaDetail(PeliculaBase):
    id: int
    personajes: List[PersonajeOut] = []

    class Config:
        orm_mode = True

class PersonajeDetail(PersonajeBase):
    id: int
    peliculas: List[PeliculaOut] = []

    class Config:
        orm_mode = True
