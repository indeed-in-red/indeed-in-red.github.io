cp -r source/. build/
rm build/style.scss
sass source/style.scss build/style.css
# cd source
# for entry in *
# do
#     echo "$entry"
# done