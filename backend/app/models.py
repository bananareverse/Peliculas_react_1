from sqlalchemy import Column, Integer, String, Date, Table, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

# Tabla intermedia para la relación muchos a muchos
personaje_pelicula = Table(
    'personaje_pelicula',
    Base.metadata,
    Column('personaje_id', Integer, ForeignKey('personajes.id')),
    Column('pelicula_id', Integer, ForeignKey('peliculas.id'))
)

class Pelicula(Base):
    __tablename__ = 'peliculas'

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, index=True)
    clasificacion = Column(String)
    fecha_estreno = Column(Date)
    resena = Column(String)
    temporada = Column(String, nullable=True)
    imagen = Column(String)

    personajes = relationship(
        'Personaje',
        secondary=personaje_pelicula,
        back_populates='peliculas'
    )

class Personaje(Base):
    __tablename__ = 'personajes'

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    descripcion = Column(String)
    imagen = Column(String)

    peliculas = relationship(
        'Pelicula',
        secondary=personaje_pelicula,
        back_populates='personajes'
    )
