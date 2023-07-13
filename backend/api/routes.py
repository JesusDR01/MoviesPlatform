# -*- encoding: utf-8 -*-
"""
Copyright (c) 2023 - present Jesús Díaz Rivas
"""

from flask import request
from flask_restx import Api, Resource, fields

from .models import db, Movies
from .config import BaseConfig

rest_api = Api(version="1.0", title="Movies API")


"""
    Flask-Restx models for api request and response data
"""

movie_model = rest_api.model('Movie', {
    "name": fields.String(required=True, min_length=2, max_length=128),
    "director": fields.String(required=True, min_length=4, max_length=64),
    "year": fields.Integer(required=True, min=0),
    "mean_rating": fields.Float(required=True, min=1, max=5)
})

"""
    Flask-Restx routes
"""

@rest_api.route('/api/movies')
class Create(Resource):
    """
       Creates a new movie by taking 'movie_model' input
    """

    @rest_api.expect(movie_model, validate=True)
    def post(self):

        req_data = request.get_json()

        _name = req_data.get("name")
        _director = req_data.get("director")
        _year = req_data.get("year")
        _mean_rating = req_data.get("mean_rating")

        new_movie = Movies(name=_name, director=_director,  mean_rating=_mean_rating, year=_year)

        new_movie.save()

        return {"success": True,
                "movieID": new_movie.id,
                "name": new_movie.name,
                "director": new_movie.director,
                "year": new_movie.year,
                "mean_rating": new_movie.mean_rating,
                "msg": "The movie was successfully created"}, 200

@rest_api.route('/api/movies/<int:movie_id>')
class Update(Resource):
    """
        Updates an existing movie by taking 'movie_model' input
    """

    @rest_api.expect(movie_model, validate=True)
    def put(self, movie_id):

        movie = Movies.query.get(movie_id)

        if movie is None:
            return {"success": False, "msg": "Movie not found"}, 404

        req_data = request.get_json()
        _name = req_data.get("name")
        _director = req_data.get("director")
        _year = req_data.get("year")
        _mean_rating = req_data.get("mean_rating")

        movie.name = _name
        movie.director = _director
        movie.year = _year
        movie.mean_rating = _mean_rating

        movie.save()

        return {"success": True,
                "movieID": movie.id,
                "name": movie.name,
                "director": movie.director,
                "year": movie.year,
                "mean_rating": movie.mean_rating,
                "msg": "The movie was successfully updated"}, 200

    def delete(self, movie_id):
        movie = Movies.query.get(movie_id)

        if movie is None:
            return {"success": False, "msg": "Movie not found"}, 404

        db.session.delete(movie)
        db.session.commit()

        return {"success": True, "msg": "The movie was successfully deleted"}, 200


  
@rest_api.route('/api/movies/search')
class Search(Resource):
    """
    Performs an advanced search on movies based on filtering criteria
    """

    @rest_api.expect(movie_model)
    def post(self):

        page_number = int(request.args.get('page', 1))
        per_page = int(request.args.get('per_page', 10))

        filters = {}

        try:
            req_data = request.get_json()
            name = req_data.get("name")

            if name:
                filters["name"] = name

            director = req_data.get("director")
            if director:
                filters["director"] = director

            year = req_data.get("year")
            if year:
                filters["year"] = year

            mean_rating = req_data.get("mean_rating")
            if mean_rating:
                filters["mean_rating"] = mean_rating
        except Exception as e:
            print("No filters provided")
        
        try:
            if filters.__len__() == 0:
                page = Movies.query.paginate(page=page_number, per_page=per_page)
            else:
                page = Movies.query.filter_by(**filters).paginate(page=page_number, per_page=per_page)
        except Exception as e:
                return {"success": False, "msg": "Error: No movies found"}, 500

        result = []
        for movie in page.items:
            result.append({
                "movieID": movie.id,
                "name": movie.name,
                "director": movie.director,
                "year": movie.year,
                "mean_rating": movie.mean_rating,
            })
       
        return {"success": True, "movies": result, "total_pages": page.pages, "current_page": page_number}, 200