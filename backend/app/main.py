from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from . import models
from .database import engine, SessionLocal
from . import schemas

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Personajes
@app.post("/personajes/", response_model=schemas.PersonajeOut)
def crear_personaje(personaje: schemas.PersonajeCreate, db: Session = Depends(get_db)):
    db_p = models.Personaje(**personaje.dict())
    db.add(db_p); db.commit(); db.refresh(db_p)
    return db_p

@app.get("/personajes/", response_model=List[schemas.PersonajeDetail])
def listar_personajes(db: Session = Depends(get_db)):
    return db.query(models.Personaje).all()

# Películas
@app.post("/peliculas/", response_model=schemas.PeliculaOut)
def crear_pelicula(p: schemas.PeliculaCreate, db: Session = Depends(get_db)):
    db_p = models.Pelicula(
        nombre=p.nombre,
        clasificacion=p.clasificacion,
        fecha_estreno=p.fecha_estreno,
        resena=p.resena,
        temporada=p.temporada,
        imagen=p.imagen
    )
    if p.personajes_ids:
        personajes = db.query(models.Personaje).filter(models.Personaje.id.in_(p.personajes_ids)).all()
        db_p.personajes = personajes
    db.add(db_p); db.commit(); db.refresh(db_p)
    return db_p

@app.get("/peliculas/", response_model=List[schemas.PeliculaDetail])
def listar_peliculas(db: Session = Depends(get_db)):
    return db.query(models.Pelicula).all()

@app.get("/peliculas/{pelicula_id}", response_model=schemas.PeliculaDetail)
def obtener_pelicula(pelicula_id: int, db: Session = Depends(get_db)):
    p = db.query(models.Pelicula).filter(models.Pelicula.id == pelicula_id).first()
    if not p:
        raise HTTPException(404, "Película no encontrada")
    return p



@app.delete("/peliculas/{pelicula_id}")
def eliminar_pelicula(pelicula_id: int, db: Session = Depends(get_db)):
    p = db.query(models.Pelicula).filter(models.Pelicula.id == pelicula_id).first()
    if not p:
        raise HTTPException(404, "Película no encontrada")
    db.delete(p); db.commit()
    return {"ok": True}
