
Change Log
==========

### 2016-09-15

* Update 4 GA layers that have moved.

### 2016-08-09

* Update ACT catalog with new layer descriptions.
* Update type of Sunshine Coast Council to esri-group.

### 2016-07-15

* Add 62 layers from the ACT Government.
* Switch to using EJS templates instead of merging JSON files. Much simpler and more flexible.
* Generate a nm_big.json alongside nm.json, which is un-minified.
* Added ABC stories to Communications group.
* Search data.vic.gov.au for KMZs (and GeoJSON and Csv-geo-au, which there aren't any of yet).
* Added ACMA dataset.
* Added Geoscience Australia DEM datasets.
* Added Agricultural Exposure and Building Exposure datasets.
* Added ABS statistical boundary GIS layers from the ABS Esri MapServer.
* Add Local Government top-level group with councils from WA, SA, Vic, Tasmania and QLD.

### 2016-06-15

* Changed the message that is displayed the first time the ACT group is opened.  It now indicates that the data will be back after 1 July.
* Fixed an incorrect legend displayed for several datasets in `Statistical Boundaries`.
* Fixed an incorrect licence displayed for several Tasmanian Government datasets.

### 2016-05-13

* Added `Scanned 1:250K Geological Maps` to `National Data Sets` -> `Land`.
* Added `Commonwealth Electoral Divisions (2016)` to `National Boundaries`.
* Renamed `Commonwealth Electoral Divisions` to `Commonwealth Electoral Divisions (2011)`.

### 2016-04-15-updated-2016-04-28

* Added `Australia 250K Topographic Map 2008` to `National Data Sets` -> `Land`.

### 2016-04-15-updated-2016-04-27

* Updated Western Australia CKAN query to point to "_Public_Services".
* Updated URLs for `Gravity Anomaly` and `Magnetic Intensity` layers in `Land` to point to `services.ga.gov.au`.
* Updated URLs of various datasets in `Framework` to use `services.ga.gov.au`.

### 2016-04-15

* Catalog now used live by NationalMap, hosted on S3: http://static.nationalmap.nicta.com.au/init/2016-04-15.json
