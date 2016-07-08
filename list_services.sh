OUT="build/ga_services.txt"
echo "These Geoscience Australia services are currently being referenced in the catalog." > $OUT
echo "Report generated at `date`" >> $OUT
echo >> $OUT
node_modules/jq-cli-wrapper/jq-releases/jq . < build/nm.json | \
grep '"url":.*ga.gov.au' | sort | uniq | \
perl -pi -e 's/^.*http/http/g;' | perl -pi -e 's/\",$//g;' >> $OUT