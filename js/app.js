const contractSource = ``;
const contractAddress = "";
var client = null;
var slipArray = [];
var slipsLength = 0;


function renderSlip() {
    var template = $('#template').html();
    Mustache.parse(template);
    var rendered = Mustache.render(template, {slipArray});
    $('#slipBody').html(rendered);
    console.log("content loaded");
    
}

window.addEventListener('load', async () => {
    renderSlip();
});

// jQuery('#slipBody').on("click", '.btn-save', async function(event) {
//     const value = $(this).siblings('input').val();
//     const dataIndex = event.target.id;
//     const foundIndex = slipArray.findIndex(slip => slip.index == dataIndex);
//     slipArray[foundIndex].total += parseInt(value, 10);
//     renderSlip();
// })

$('#btn-save').click(async function() {
    console.log("Button pressed, function fired");
    // function checkOrg() {
    //     if (true) {
    //         $('#org').on('click', function() {
    //             $(this).val();
    //             console.log("company");
        
    //         });
    //     } 
    //     else {
    //         $('#personal').click(function() {
    //             $(this).val();
    //             document.write("Persoanl");
    //         });
    //     }
    //     console.log("Function successfully fired");
        
    // }
    // checkOrg();

    
    var name = ($('#username').val()),
        farmId = ($('#farm').val()),
        land = ($('#land').val()),
        acquire = ($('#purchase').val()),
        work = ($('#labour').val()),
        items = ($('#tools').val()),
        produce = ($('#crops').val()),
        lives = ($('#stock').val()),
        gain = ($('#profit').val()),
        sex = ($('#sex').val()),
        lost = ($('#loss').val()),
        sum = parseInt(work + items - lost),
        output = parseInt(acquire - sum),
        totalNo = parseInt(output);
        console.log(totalNo);

    slipArray.push({
        creatorName: name,
        farmName: farmId,
        hectares: land,
        purchases: acquire,
        labour: work,
        gender: sex,
        equipment: items,
        crops: produce+'%',
        livestock: lives+'%',
        profits: gain,
        loss: lost,
        total: totalNo
    })

    renderSlip();
    console.log("Slip rendered");

});