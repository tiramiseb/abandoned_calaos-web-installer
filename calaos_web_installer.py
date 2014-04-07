#!/usr/bin/env python
#
#   Copyright 2014 Sebastien Maccagnoni-Munch
#
#   This file is part of Calaos Web Installer.
#
#   Calaos Web Installer is free software: you can redistribute it and/or
#   modify it under the terms of the GNU Affero General Public License as
#   published by the Free Software Foundation, either version 3 of the License,
#   or (at your option) any later version.
#
#   Calaos Web Installer is distributed in the hope that it will be useful,
#   but WITHOUT ANY WARRANTY; without even the implied warranty of
#   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#   GNU Affero General Public License for more details.
#
#   You should have received a copy of the GNU Affero General Public License
#   along with Calaos Web Installer. If not, see <http://www.gnu.org/licenses/>.

DEVEL=True
IO='io.pickle'
RULES='rules.pickle'

###############################################################################

import json
import subprocess

from flask import Flask, jsonify, request

import calaosapi

###############################################################################

calaos = calaosapi.CalaosApi(IO, RULES)

app = Flask(__name__)

@app.route('/')
@app.route('/<something>')
def index(something='index'):
    if DEVEL:
        subprocess.call(['./generate_static.sh', 'debug'])
    return open('html/{}.html'.format(something), 'r').read()

@app.route('/config', methods=['GET', 'POST'])
def io():
    if request.method == 'POST':
        data = json.loads(request.data)
        calaos.io = data['io']
        calaos.rules = data['rules']
        calaos.writefiles()
    return jsonify(calaos.get_config())

@app.route('/favicon.ico')
def favicon():
    return ''

if DEVEL:
    @app.after_request
    def nocache(response):
        response.headers.add('Cache-Control', 'no-cache')
        return response

app.run(debug=DEVEL)