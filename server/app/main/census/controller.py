from flask import request, make_response
from flask_restplus import Resource


from .services import count_population_by_name, count_population_by_id, count_all, generate_pdf
from .dto import Dto

api = Dto.api
'''
_model_in = Dto.model_in
_model_out = Dto.model_out
'''
@api.route('/')
class CensusOps(Resource):
    @api.doc('population on all registered locations')
    #@api.marshal_list_with(_model_out, envelope='data')
    def get(self):
        """List all registered locations"""
        return count_all()

@api.route('/export')
class CensusOps(Resource):
    @api.doc('exports census')
    def get(self):
        """Export census to a PDF file"""
        #return send_file('test.pdf',as_attachment=True)
        response = make_response(generate_pdf(None))
        response.headers['Content-Disposition'] = "attachment; filename='export.pdf"
        response.mimetype = 'application/pdf'
        return response


@api.route('/name/<name>')
class CensusOps(Resource):
    @api.doc('get location population')
    def get(self, name):
        """List all registered locations"""
        return count_population_by_name(name)

@api.route('/id/<id>')
class CensusOps(Resource):
    @api.doc('get location population')
    def get(self, id):
        """List all registered locations"""
        return count_population_by_id(id)
