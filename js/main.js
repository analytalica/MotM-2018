/**
 * Created by Chris on 11/4/2014.
 *
 * 'letter'            : [612,   792],
 */

//default values
var margin = .5;
var indent = .25;
var currentY = margin;

function getInfo(isDefault){
    if(isDefault){
        return {
            name : "First Name Last Name",
            email : "example@example.com",
            website : "example.com",
            phone : "(555) 123-4567",
            degree: "Bachelor's of Science",
            gpa: "4.0",
            honors: "Freshman Research Initiative, Turing Scholar",
            grad: "May 2018",
            company: "Google,",
            location: "Mountain View, CA",
            title: "Software Developer",
            start: "May 2012",
            end: "August 2012",
            descrip: "Created end-to-end support for an intelligent media extractor that is activated when pasting a link in the Google+ sharebox, as part of Google+ front end team",
            company2: "Lockheed Martin,",
            location2: " Gaithersburg, MD",
            title2: "Summer Intern",
            start2: "May 2011",
            end2: "August 2011",
            descrip2: "Constructed an SNMP trap receiver that could parse and identify requested traps into syslog messages for R&D cyber security and networking management team",
            project: "Implemented the Paxos algorithm for reaching consensus among state machines in a distributed system in the context of a music playlist, and then extended it to instead implement the Bayou algorithm for reaching consensus by use of a gossip protocol in the same context of a music playlist"
        };

    } else {
        return {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            website: document.getElementById('website').value,
            phone: "(" + document.getElementById('phone').value.substring(0,3) + ") " + document.getElementById('phone').value.substring(3,6) + "-" + document.getElementById('phone').value.substring(6),
            degree: document.getElementById('degreeType').value,
            gpa: document.getElementById('gpa').value,
            honors: document.getElementById('honors').value,
            grad: document.getElementById('grad').value,
            company: document.getElementById('company').value,
            location: document.getElementById('location').value,
            title: document.getElementById('title').value,
            start: document.getElementById('start').value,
            end: document.getElementById('end').value,
            current: document.getElementById('current').checked,
            descrip: document.getElementById('descrip').value,
            company2: document.getElementById('company2').value,
            location2: document.getElementById('location2').value,
            title2: document.getElementById('title2').value,
            start2: document.getElementById('start2').value,
            end2: document.getElementById('end').value,
            current2: document.getElementById('current2').checked,
            descrip2: document.getElementById('descrip2').value,
            project: document.getElementById('project2').value
        };
    }
}



function createDoc(info){

    function nextLine(){
        currentY += (1.2 * doc.internal.getFontSize() * 0.013888888888889);
    }

    function printLine(txt, align, size, style, ignore){
        if(size != null){
            doc.setFontSize(size);
        }

        if (style != null){
            doc.setFontStyle(style);
        }

        if(align == "center"){
            doc.alignText(txt,{align: "center"},.5,currentY);
        } else if (align == "right"){
            doc.alignText(txt,{align: "right", margin: margin},1,currentY);
        } else {
            doc.text(txt,margin,currentY);
        }

        if(!ignore){
            nextLine();
        }
    }

    function getTextWidth(txt){
        var fontSize = doc.internal.getFontSize();
        return doc.getStringUnitWidth(txt)*fontSize/doc.internal.scaleFactor;
    }

    var doc = new jsPDF("p","in","letter");
    var pageWidth = doc.internal.pageSize.width;


    doc.setFont("times","bold");

    //contact information
    printLine(info.name,"center",24,"bold",true);
    currentY += .2;
    printLine(info.email,"center",12,"normal");
    if(info.website != " " || info.website != "" || info.website != null){
        printLine(info.website,"center");
    }
    printLine(info.phone,"center");

    //education section
    printLine("EDUCATION",null,null,"bold",true);
    doc.setLineWidth(0.01);
    doc.line(margin,currentY +.025,pageWidth-margin,currentY+.025);
    nextLine();
    printLine("The University of Texas at Austin,",null,null,"bold",true);
    doc.setFontStyle("normal");
    doc.text("Austin, TX",3,currentY);
    printLine(info.grad,"right",null,"italic");
    printLine((info.degree + " in Computer Science"),null,null,"bold");
    doc.setFontStyle("normal");
    if(info.gpa >= 3){
        doc.text("• " + info.gpa +" GPA",margin+indent,currentY);
        nextLine();
    }
    if(info.honors != null || info.honors != " " || info.honors != ""){
        doc.text("• " +info.honors,margin+indent,currentY);
        nextLine();
    }

    currentY += .1;

    //experience section
    printLine("EXPERIENCE",null,null,"bold",true);
    doc.line(margin,currentY +.025,pageWidth-margin,currentY+.025);
    nextLine();
    //job 1

    printLine(info.company,null,null,"bold",true);
    doc.setFontStyle("normal");
    doc.text(info.location,margin+getTextWidth(info.company+" "),currentY);
    nextLine();
    doc.text(info.title,margin,currentY);
    if (!info.current){
        printLine(info.start + " - " + info.end,"right",null,"italic");
    } else {
        printLine(info.start + " - Current","right",null,"italic");
    }
    doc.setFontStyle("normal");

    var newDescrip = doc.splitTextToSize("• " + info.descrip,pageWidth-((2*margin)+indent),null);
    doc.text(newDescrip,margin+indent,currentY);
    nextLine();
    currentY += .3;

    //job 2
    printLine(info.company2,null,null,"bold",true);
    doc.setFontStyle("normal");
    doc.text(info.location2,margin+getTextWidth(info.company2+" "),currentY);
    nextLine();
    doc.text(info.title2,margin,currentY);
    if (!info.current2){
        printLine(info.start2 + " - " + info.end2,"right",null,"italic");
    } else {
        printLine(info.start2 + " - Current","right",null,"italic");
    }
    doc.setFontStyle("normal");

    var newDescrip2 = doc.splitTextToSize("• " + info.descrip2,pageWidth-((2*margin)+indent),null);
    doc.text(newDescrip2,margin+indent,currentY);
    nextLine();
    currentY += .3;

    //projects section
    printLine("PROJECTS",null,null,"bold",true);
    doc.line(margin,currentY +.025,pageWidth-margin,currentY+.025);
    nextLine();
    doc.setFontStyle("normal");
    var newDescrip3 = doc.splitTextToSize("• " + info.project,pageWidth-((2*margin)+indent),null);
    doc.text(newDescrip3,margin+indent,currentY);
    nextLine();

    return doc;
}

$(document).ready(function() {

    var info = getInfo(true);
    var doc = createDoc(info);
    var iframe = document.getElementById('output');
    iframe.src = doc.output('datauristring');


    $('#download').click(function(){
        currentY = margin;
        var info = getInfo(false);
        var doc = createDoc(info);
        doc.save("resume.pdf");
    });

    $('form').on('change',function(){
        currentY = margin;
        var info = getInfo(false);
        var doc = createDoc(info);
        var iframe = document.getElementById('output');
        iframe.src = doc.output('datauristring');
    });
});
