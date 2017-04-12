var zDATA;

function zTable(data){
    var obj = data;
    zDATA = data;
    var columnNames = { titles: ["Street","City", "State", "Zipcode","Property Status","Price", "Property Specs", "Days on the market","Full Address","URL"]}; 
    
    $('#ntable').append('<table></table>');
    var table = $('#ntable').children();
        table.append('<thead></thead>');
    table.find('thead').append('<tr></tr>'); 
    
    $(columnNames.titles).each(function(i,e){
        table.find('thead tr').append('<th>'+e+'</th>');            
    });
    
    table.append('<tbody></tbody>'); 
    $(obj).each(function(i){
        var tmpdata = obj[i];
        //console.log(tmpdata)
         table.find('tbody').append('<tr></tr>');
         $.each(tmpdata, function(x,y){
             //console.log("key "+x)
           //  console.log("val "+y)
             
            table.find('tbody > tr').last().append('<td>'+y+'</td>');
             
             
         });
        
    });
    
    zGraph();
}

function zGraph(){
    var totalNum = zDATA.length;
    var nconstruction=0;
    var ncomingsoon=0;
    var nhousesale=0;
    var ncondosale=0;
    var ntownsale=0;
    var nsalebyowner=0;
    var naptsale =0;
    
    var columnNames = { status: ["New Construction","Coming Soon", "House For Sale", "Condo For Sale","Townhouse For Sale","For Sale by Owner", "Apartment For Sale"]};
    
   $.each(zDATA, function(i, e){
        //console.log(i +", "+e.propertyStatus)
       if(e.propertyStatus == "New Construction"){
           nconstruction+=1;
       }
       else if(e.propertyStatus == "Coming Soon"){
            ncomingsoon+=1;
        }
        else if(e.propertyStatus == "House For Sale"){
            nhousesale+=1;
        }
       else if(e.propertyStatus == "Condo For Sale"){
               ncondosale+=1;
        }
        else if(e.propertyStatus == "Townhouse For Sale"){
               ntownsale+=1;
        }
       else if(e.propertyStatus == "For Sale by Owner"){
               nsalebyowner+=1;
        }
        else if(e.propertyStatus == "Apartment For Sale"){
              naptsale+=1;
        }
    });
    
    var pconstruction=0;
    var pcomingsoon=0;
    var phousesale=0;
    var pcondosale= 0;
    var ptownsale=0;
    var psalebyowner=0;
    var paptsale=0;
    
    pconstruction = Math.round(((nconstruction/totalNum) * 100)*100)/100;
    pcomingsoon = Math.round(((ncomingsoon/totalNum) * 100)*100)/100;
    phousesale = Math.round(((nhousesale/totalNum) * 100)*100)/100;
    pcondosale = Math.round(((ncondosale/totalNum) * 100)*100)/100;
    ptownsale = Math.round(((ntownsale/totalNum) * 100)*100)/100;
    psalebyowner = Math.round(((nsalebyowner/totalNum) * 100)*100)/100;
    paptsale = Math.round(((naptsale/totalNum) * 100)*100)/100;
    
    Morris.Donut({
          element: 'ncharts',
          data: [
            {value: pconstruction, label: 'New Construction', formatted: 'at least '+pconstruction+'%' },
            {value: pcomingsoon, label: 'Coming Soon', formatted: 'approx. '+pcomingsoon+'%' },
            {value: phousesale, label: 'House For Sale', formatted: 'approx. '+phousesale+'%' },
            {value: pcondosale, label: 'Condo For Sale', formatted: 'at most '+pcondosale+'%'},
            {value: ptownsale, label: 'Townhouse For Sale', formatted: 'at least '+ptownsale+'%' },
            {value: psalebyowner, label: 'For Sale by Owner', formatted: 'approx. '+psalebyowner+'%'},
            {value: paptsale, label: 'Apartment For Sale', formatted: 'approx. '+paptsale+'%' }
          ],labelColor: '#ffffff',
          formatter: function (x, data) { return data.formatted; }
        });

    zLineGraph();
}

function zLineGraph(){
    
    var totalNum = zDATA.length;
    var aless=0;
    var amore=0;
    var bless=0;
    var bmore=0;
    var cless=0;
    var cmore=0;
    var dless=0;
    var dmore=0;
    var eless=0;
    var emore=0;
    
       $.each(zDATA, function(i, e){
        console.log(i +", "+e.propertyPrice)
           var priceval = e.propertyPrice;
        
        if (priceval.indexOf('+') >= 0 || priceval.indexOf('$') >= 0) {
        // it has it either one
           priceval = priceval.replace(/\W+/g, '');
        }
             
           
       if(priceval <=100000 && priceval <200000){
           if(priceval <=100000){
               aless+=1;
           }else if(priceval <200000){
               amore+=1;
           }
          
       }else if(priceval >=200000 && priceval <500000){
           if(priceval >=200000 ){
               bless+=1;
           }else if(priceval <500000){
               bmore+=1;
           }
          
       }else if(priceval >=500000 && priceval <700000){
           if(priceval >=500000){
               cless+=1;
           }else if(priceval <700000){
               cmore+=1;
           }
          
       }else if(priceval >=700000 && priceval <900000){
           if(priceval >=700000 ){
               dless+=1;
           }else if(priceval <90000){
               dmore+=1;
           }
          
       }else if(priceval >=900000){
          if(priceval >=900000 && priceval <1000000){
               eless+=1;
           }else if(priceval >=1000000){
               emore+=1;
           }
       }
           
    });
    
    Morris.Area({
      element: 'ngraph',
        behaveLikeLine: true,
      data: [
        {x: '100', y: aless, z: amore},
        {x: '200', y: bless, z: bmore},
        {x: '300', y: cless, z: cmore},
        {x: '400', y: dless, z: dmore},
        {x: '500', y: eless, z: emore}
      ],
      xkey: 'x',
      ykeys: ['y', 'z'],
      labels: ['Y', 'Z']
    }).on('click', function(i, row){
      console.log(i, row);
    });
}