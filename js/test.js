const contractSource = `
contract FarmRecords =

    record slip =
        { creatorAddress: address,
            name          : string,
            farmName      : string,
            gender        : string,
            hectares      : string,
            purchase      : int,
            labour        : int,
            equipment     : int,
            crop          : int,
            livestock     : int,
            profits       : int,
            loss          : int,
            total         : int}
        
    record state = {
        slips: map(int, slip),
        slipsLength: int }
    
    entrypoint init() = { slips = {}, slipsLength = 0 }

    // Error handling for wrong index
    entrypoint getSlip(index : int) : slip = 
        switch(Map.lookup(index, state.slips))
            None => abort("There is no farm record that exixt with this index!!!")
            Some(x) => x

    // save records to the blockchain 
    stateful entrypoint recordSlip(  _name: string, _farm: string, _sex: string, _hectare: string) =
        let slip = {creatorAddress = Call.caller, name = _name, farmName = _farm, gender = _sex, hectares = _hectare, purchase = 0, labour = 0, equipment = 0, crop = 0, livestock = 0, profits = 0, loss = 0,   total = 0}
        let index = getSlipsLength() + 1
        put(state{ slips[index] = slip, slipsLength = index })

    // Keep counts of record slips
    entrypoint getSlipsLength() : int =
        state.slipsLength

    // To calculate the total cost
    //stateful entrypoint getTotalSum(sum: int) : int = 
    //let sum = labour + equipment + loss
    //let updatedTotal = sum
    //put(state{ total = updatedTotal })
  `;
const contractAddress = 'ct_tMmw9fZ2SJLk9U6Tj2PKa8EHuoat5pU3WRKa5CbdfemweJaV1';
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

async function callStatic(func, args) {
    const contract = await client.getContractInstance(contractSource, {contractAddress});
    const calledGet = await contract.call(func, args, {callStatic: true}).catch(e => console.error(e));

    const decodeGet = await calledGet.decode().catch(e => console.error(e));

    return decodeGet;
    
}

window.addEventListener('load', async () => {

    client = await Ae.Aepp();

    slipsLength = await callStatic('getSlipsLength', []);

    for (i = 1; i <= slipsLength; i++) {
        const slip =  await callStatic('getSlip', [i]);

        slipArray.push({
            creatorName: name,
            farmName: farmId,
            hectares: land,
            purchases: acquire,
            labour: work,
            index: i,
            gender: sex,
            equipment: items,
            crops: produce+'%',
            livestock: lives+'%',
            profits: gain,
            loss: lost,
            total: totalNo
        })

    }
    
    
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
        index: 0,
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