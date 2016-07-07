"use strict";

/*global require*/

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var gutil = require('gulp-util');
//var generateSchema = require('generate-terriajs-schema');
//var validateSchema = require('terriajs-schema');

var watching = false; // if we're in watch mode, we try to never quit.
var watchOptions = { poll:1000, interval: 1000 }; // time between watch intervals. OSX hates short intervals. Different versions of Gulp use different options.
var sourceDir = 'datasources';
var workDir = 'work';
var targetDir = 'build';
// Create the build directory, because browserify flips out if the directory that might
// contain an existing source map doesn't exist.

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir);
}

if (!fs.existsSync(workDir)) {
    fs.mkdirSync(workDir);
}

gulp.task('build', ['render-datasource-templates', 'list-ga-services']);
gulp.task('release', ['render-datasource-templates','make-editor-schema', 'validate']);
gulp.task('watch', ['watch-datasource-templates']);
gulp.task('default', ['build']);

gulp.task('list-ga-services', function(done) {
    var exec = require('child_process').exec;
    exec('./list_services.sh', function (err, stdout, stderr) {
        if (stderr)
            console.log(stderr);
        done(err);
    });
});

// Generate new schema for editor, and copy it over whatever version came with editor.
gulp.task('make-editor-schema', ['copy-editor'], function(done) {
/*    generateSchema({
        source: 'node_modules/terriajs',
        dest: 'wwwroot/editor',
        noversionsubdir: true,
        editor: true,
        quiet: true
    }).then(done);*/
});

/*gulp.task('copy-editor', function() {
    return gulp.src('./node_modules/terriajs-catalog-editor/**')
        .pipe(gulp.dest('./wwwroot/editor'));
});*/


// Generate new schema for validator, and copy it over whatever version came with validator.
gulp.task('make-validator-schema', function(done) {
    // Skip generation for now.
    done();
    /*generateSchema({
        source: 'node_modules/terriajs',
        dest: 'node_modules/terriajs-schema/schema',
        quiet: true
    }).then(done);*/
});
/*
This is definitely broken now.
gulp.task('validate', ['merge-datasources', 'make-validator-schema'], function() {
    return validateSchema({
        terriajsdir: 'node_modules/terriajs',
        _: glob.sync([sourceDir + '/00_National_Data_Sets/*.json', sourceDir + '/*.json', '!' + sourceDir + '/00_National_Data_Sets.json', targetDir + '/*.json', '!' + targetDir + '/nm.json'])
    }).then(function(result) {
        if (result && !watching) {
            // We should abort here. But currently we can't resolve the situation where a data source legitimately
            // uses some new feature not present in the latest published TerriaJS.
            //process.exit(result);
        }
    });
});
*/
/*
    Use EJS to render "datasources/foo.ejs" to "wwwroot/init/foo.json". Include files should be
    stored in "datasources/includes/blah.ejs". You can refer to an include file as:

    <%- include includes/foo %>

    If you want to pass parameters to the included file, do this instead:

    <%- include('includes/foo', { name: 'Cool layer' } %>

    and in includes/foo:

    "name": "<%= name %>"
 */
gulp.task('render-datasource-templates', function() {
    var ejs = require('ejs');
    var JSON5 = require('json5');
    try {
        fs.accessSync(sourceDir);
    } catch (e) {
        // Datasources directory doesn't exist? No problem.
        return;
    }
    fs.readdirSync(sourceDir).forEach(function(filename) {
        if (filename.match(/\.ejs$/)) {
            var templateFilename = path.join(sourceDir, filename);
            var template = fs.readFileSync(templateFilename,'utf8');
            var result = ejs.render(template, null, {filename: templateFilename}), result_big='';

            // Remove all new lines. This means you can add newlines to help keep source files manageable, without breaking your JSON.
            // If you want actual new lines displayed somewhere, you should probably use <br/> if it's HTML, or \n\n if it's Markdown.
            //result = result.replace(/(?:\r\n|\r|\n)/g, '');

            var outFilename = filename.replace('.ejs', '.json');

            try {
                result = JSON.stringify(JSON5.parse(result), null, 0);
                result_big = JSON.stringify(JSON5.parse(result), null, 2);
                console.log('Rendered template ' + outFilename);
            } catch (e) {
                console.warn('Warning: Rendered template ' + outFilename + ' is not valid JSON');
            }
            fs.writeFileSync(path.join(targetDir, outFilename), new Buffer(result));
            // write a non-minified version too.
            fs.writeFileSync(path.join(targetDir, filename.replace('.ejs', '_big.json')), new Buffer(result_big));
        }
    });

});

gulp.task('watch-datasource-templates', ['render-datasource-templates'], function() {
    return gulp.watch(['datasources/**/*.ejs','datasources/*.json'], watchOptions, [ 'render-datasource-templates' ]);
});