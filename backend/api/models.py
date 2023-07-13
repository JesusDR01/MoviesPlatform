# -*- encoding: utf-8 -*-
"""
Copyright (c) 2023 - present Jesús Díaz Rivas
"""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Movies(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    director = db.Column(db.String(128), nullable=True)
    mean_rating = db.Column(db.Integer())
    year = db.Column(db.Integer())

    def __repr__(self):
        return f"Movie {self.name}"

    def save(self):
        db.session.add(self)
        db.session.commit()


    def update_mean_rating(self, mean_rating):
        self.mean_rating = mean_rating

    def update_director(self, new_director):
        self.director = new_director

    def update_name(self, new_name):
        self.name = new_name

    def update_year(self, new_year):
        self.year = new_year

    @classmethod
    def get_by_id(cls, id):
        return cls.query.get_or_404(id)

    @classmethod
    def get_by_director(cls, director):
        return cls.query.filter_by(director=director).first()
    
    @classmethod
    def get_by_name(cls, name):
        return cls.query.filter_by(name=name).first()

    def toDICT(self):

        cls_dict = {}
        cls_dict['_id'] = self.id
        cls_dict['name'] = self.name
        cls_dict['director'] = self.director
        cls_dict['year'] = self.year
        cls_dict['mean_rating'] = self.mean_rating

        return cls_dict

    def toJSON(self):

        return self.toDICT()



