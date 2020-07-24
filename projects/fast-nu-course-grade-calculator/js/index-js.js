$('document').ready(function(){

    function calcGrade(){

        var MCA = parseFloat($('#MCA').val());
        MCA = Math.round(MCA);

        var abs = parseInt($('#abs').val());

        var pivot;

        // 11 Grades
        var grades = ['D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A', 'A+'];
        // Distribution
        var dist = [];

            if (abs <= 0) {

                $('#grade').html("bruh 🙏");
                $('#grading').html("");

            }
            else if (MCA < 100 && MCA > 0) {

                if (MCA < 50) {
                    pivot = 4;
                }
                else if (MCA >= 50 && MCA < 65) {
                    pivot = 5;
                }
                else {
                    pivot = 6;
                }

                for (var i = pivot; i < grades.length; i++) {

                    dist[i] = MCA + (5 * (i - pivot));

                }

                var fReached = false;

                for (var i = pivot; i >= 0; i--) {

                    dist[i] = MCA - (5 * (pivot - i));
                    if (dist[i] < 30 && !fReached) {
                        dist[i] = 30;
                        fReached = true;
                    }
                    else if (fReached){
                        dist[i] = -1;
                    }

                }


                // Finding the grade

                var grade = 'F';
                abs = parseInt($('#abs').val());

                if (abs >= 0 && abs <= 100){
                    if (abs > 29){
                        var gradeFound = false;

                        for (var i = dist.length - 1; i >= 0 && !gradeFound; i--) {

                            if (abs >= dist[i]) {
                                grade = grades[i];
                                gradeFound = true;
                            }

                        }

                        if(!gradeFound) {
                            grade = 'F'; 
                            gradeFound = true;  
                        }

                    }
                    else {
                        grade = 'F';
                        gradeFound = true;
                    }
                }

                if (gradeFound){
                    $('#grade').html("Your grade is: " + grade);
                    $('#grading').html("");

					/*
                    if (grade == 'F') {
                        $('#yt-player').css('opacity', '1');
                        $('#yt-player').css('width', '360');
                        $('#yt-player').css('height', '315');
                        $('#yt-player').attr('src', 'https://www.youtube.com/embed/QuNhTLVgV2Y?autoplay=1');
                        
                    } else if (grade == 'A' || grade == 'A+') {

                        $('#yt-player').css('opacity', '1');
                        $('#yt-player').css('width', '360');
                        $('#yt-player').css('height', '315');
                        $('#yt-player').attr('src', 'https://www.youtube.com/embed/BStqGIkanKk?autoplay=1');

                    }
                    */

                    var bDiff = 0;

                    for (var i = 0; i < grades.length; i++){

                        if (dist[i] != -1){

                            if (i == pivot) {
                            
                                $('#grading').append("<tr><td class=\"gradeLabel\" id=\"pGrade\">" + grades[i] + "</td>" + "<td class=\"gradeVal\" id=\"pVal\">" + dist[i] + "</td></tr><br/>");
                                bDiff++;

                            }
                            else {

                                if (grades[i] == grade){

                                    $('#grading').append("<tr><td class=\"gradeLabel\" id=\"cGrade\">" + grades[i] + "</td>" + "<td class=\"gradeVal\" id=\"cVal\">" + dist[i] + "</td></tr><br/>");
                                    bDiff++
                                
                                }
                                else {

                                    $('#grading').append("<tr><td class=\"gradeLabel\">" + grades[i] + "</td>" + "<td class=\"gradeVal\">" + dist[i] + "</td></tr><br/>");
                                    bDiff++;

                                }

                            }

                            
                        }
                    }


                }


            } else {

                $('#grade').html("bruh 🙏");
                $('#grading').html("");
            
            }

            console.log("done");
        
        }


    $('#abs').keypress((evt) => {

        if (evt.keyCode == 13) {

            calcGrade();

        }
        
    });
    $('#calc').click(calcGrade);

});