import os
import requests
import dotenv


class CallApi():
    def __init__(self):
        self.__base_url = os.getenv('API_BASE')
        self.__header = {'X-CoinAPI-Key': os.getenv('API_KEY'),
                         'Accept-Encoding': 'deflate, gzip'}
        self.__query = ''
        self.__end_point = ''

    def connect(self):
        request = requests.get(
            '{0}{1}/{2}'.format(self.__base_url,
                                self.__end_point, self.__query),
            headers=self.__header)

        if request.status_code == 200:
            return request.json()
        else:
            return request.status_code

    def full_path(self):
        path = '{0}{1}/{2}'.format(self.__base_url,
                                   self.__end_point, self.__query)
        return path

    @property
    def headers(self):
        return self.__header

    @headers.setter
    def headers(self, headers):
        self.__header = headers

    @property
    def url(self):
        return self.__base_url

    @url.setter
    def url(self, url):
        self.__base_url = url

    @property
    def end_point(self):
        return self.__end_point

    @end_point.setter
    def end_point(self, end_point):
        self.__end_point = end_point

    @property
    def query(self):
        return self.__query

    @query.setter
    def query(self, query):
        self.__query = query
