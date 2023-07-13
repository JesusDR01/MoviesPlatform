# -*- encoding: utf-8 -*-
"""
Copyright (c) 2023 - present Jesús Díaz Rivas
"""

import pytest
import json

from api import app

"""
   Sample test data
"""

DUMMY_NAME = "Lost"
DUMMY_DIRECTOR = "John doe"
DUMMY_YEAR = 2023
DUMMY_MEAN_RATING = 5

@pytest.fixture
def client():
    with app.test_client() as client:
        yield client

def test_movie_create(client):
    """
       Tests /movies/create API
    """
    response = client.post(
        "api/movies",
        data=json.dumps(
            {
                "name": DUMMY_NAME,
                "director": DUMMY_DIRECTOR,
                "year": DUMMY_YEAR,
                "mean_rating": DUMMY_MEAN_RATING
            }
        ),
        content_type="application/json")

    data = json.loads(response.data.decode())
    assert response.status_code == 200
    assert "The movie was successfully created" in data["msg"]


def test_movie_creation_invalid_data(client):
    """
       Tests /movies API: invalid data like name field empty
    """
    response = client.post(
        "api/movies",
        data=json.dumps(
            {
                "name": "",
                "director": DUMMY_DIRECTOR,
                "year": DUMMY_YEAR,
                "mean_rating": DUMMY_MEAN_RATING
            }
        ),
        content_type="application/json")

    data = json.loads(response.data.decode())
    assert response.status_code == 400
    assert "'' is too short" in data["msg"]


def test_movie_update_correct(client):
    """
       Tests /movies API: Correct update
    """
    response = client.put(
        "api/movies/1",
        data=json.dumps(
            {
                "name": "updated name",
                "director": DUMMY_DIRECTOR,
                "year": DUMMY_YEAR,
                "mean_rating": DUMMY_MEAN_RATING
            }
        ),
        content_type="application/json")

    data = json.loads(response.data.decode())
    assert response.status_code == 200
    assert data["name"] == "updated name"


def test_movie_search(client):
    """
       Tests /movies/search?page=1 API: Correct data fetched
    """
    response = client.post(
        "api/movies/search?page=1",
        data=json.dumps(
            {
                "name": "updated name",
            }
        ),
        content_type="application/json")

    data = json.loads(response.data)
    assert response.status_code == 200
    
    assert data['movies'][0]['name'] == "updated name"
