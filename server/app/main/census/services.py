import uuid
import datetime
import copy
from flask import escape
from io import BytesIO
from pdfdocument.document import PDFDocument

from app.main import db
from app.main.location.models import Location
from app.main.person.models import Person

from app.main.pdf.services import convertJSONToTableData, generatePDF

def count_population_by_id(location_id):
    return Person.query.filter_by(location_id=escape(location_id)).count()

def count_population_by_name(name):
    print("Searching population on: ", name)
    secured_name = escape(name).strip()
    location = Location.query.filter_by(name=secured_name).first()
    return Person.query.filter_by(location_id=location.id).count()

def count_all():
    result = []
    all_locations = Location.query.all()
    for location in all_locations:
        population = Person.query.filter_by(location_id=location.id).count()
        result.append({"location_name": location.name, "population": population})
    return result

def generate_pdf(filter):
    if filter:
       print("--- TODO")
    else:
       print("--- move")
    result = count_all()

    tableData = convertJSONToTableData(result)
    return  generatePDF(title='Report', subtitle='sfasdf', data=tableData)
'''
    text = open(pdfFile, "rb")
    content = text.read()
    text.close()
    return content
'''
'''
    f = BytesIO()
    pdf = PDFDocument(f)
    pdf.init_report()


    pdf.h1('Hello World')
    pdf.p('Creating PDFs made easy.')
    pdf.generate()
    return f.getvalue()
'''



