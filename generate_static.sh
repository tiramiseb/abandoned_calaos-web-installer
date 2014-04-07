#!/bin/sh
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

# Empty the "static" and "html" directory
rm -f static/*/* static/*
rm -f html/*

cp src/assets/*/* static/assets/
cp src/images/* static/images/
cp src/fonts/* static/fonts/

if [ "$1" = 'debug' ]
then


# Concatenate but do not modify calaos-web-installer javascript files
cat src/app/cwi.js > static/cwi.js

# Copy local static data to the "static" directory
cp src/views/*.html html/
cp src/styles/*.css static/


else

echo "Early development stage, production installation is not planned yet"
echo "Sorry..."


fi