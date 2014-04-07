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

import os.path
import pickle

class CalaosApi:
    def __init__(self, io, rules):
        self.io_path = io
        self.rules_path = rules
        self.readfiles()

    def readfiles(self):
        if os.path.exists(self.io_path):
            self.io = pickle.load(file(self.io_path))
        else:
            self.io = []
        if os.path.exists(self.rules_path):
            self.rules = pickle.load(file(self.rules_path))
        else:
            self.rules = []

    def get_config(self):
        return {
            'io': self.io,
            'rules': self.rules
        }

    def writefiles(self):
        pickle.dump(self.io, file(self.io_path, 'w'))
        pickle.dump(self.rules, file(self.rules_path, 'w'))