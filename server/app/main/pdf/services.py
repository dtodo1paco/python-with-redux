from io import BytesIO
import uuid

import io

from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table
from reportlab.platypus.tables import TableStyle
from pdfdocument.document import PDFDocument


def generatePDF3(title='No title', subtitle='', data=[]):
    filename = '/tmp/.report_' + str(uuid.uuid4())
    doc = SimpleDocTemplate(filename, rightMargin=0, leftMargin=6.5 * cm, topMargin=0.3 * cm, bottomMargin=0)
    elements = []
    table = Table(data, colWidths=270, rowHeights=79)
    elements.append(table)
    doc.build(elements)
    return filename

def generatePDF(title='No title', subtitle='', data=[]):
    f = BytesIO()
    pdf = PDFDocument(f)
    pdf.init_report()


    pdf.h1('Hello World')
    pdf.p('Creating PDFs made easy.')
    pdf.generate()
    return f.getvalue()

def make_doc(data):
    pdf = io.BytesIO()

    doc = SimpleDocTemplate(pdf, pagesize=letter)

    story = []

    t=Table(data)
    story.append(t)

    doc.build(story)
    pdf.seek(0)

    return pdf

def generatePDF2(title='No title', subtitle='', data=[]):
    styles = getSampleStyleSheet()

    styleNormal = styles['Normal']
    styleHeading = styles['Heading1']
    styleHeading.alignment = 1 # centre text (TA_CENTRE)

    story = []
    story.append(Paragraph(title, styleHeading))
    story.append(Paragraph(subtitle, styleNormal))
    story.append(Table(data))
    filename = '/tmp/.report_' + str(uuid.uuid4())

    doc = SimpleDocTemplate(filename, pagesize = A4, title = title, author = "@dtodo1paco")
    doc.build(story)
    return filename

def convertJSONToTableData(jsonData):
    tableData = []
    headers = []
    data = []
    if len(jsonData) < 1:
        raise ValueError("No data to convert")
    first = jsonData[0]
    keys = first.keys()
    for key in keys:
        if len(headers) < len(keys):
            headers.append(key)
    record_index = 0
    while record_index < len(jsonData):
        record = jsonData[record_index]
        record_data = []
        column = 0
        while column < len(headers):
            record_data.append(record[headers[column]])
            column = column + 1
        data.append(record_data)
        record_index = record_index +1
    tableData.append(headers)
    tableData.append(data)
    print ("tableData: ", tableData)
    return tableData