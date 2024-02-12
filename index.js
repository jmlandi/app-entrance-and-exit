
// default values and initialization
const soundEffect = new Audio("footage/pop.mp3")
let bipType = window.document.querySelector("#bip_type")
bipType.innerHTML = "ENTRADA"

// Menu config
document.querySelector("#bip_btn").addEventListener("click", function changeBipType() {
    if (bipType.innerHTML === "ENTRADA") {
        bipType.innerHTML = "SAÍDA"
        document.querySelector("body").style = "background-color: tomato"
    } else {
        bipType.innerHTML = "ENTRADA"
        document.querySelector("body").style = "background-color: #afff36"
    }
})


// QR code config
const scanner = new Html5QrcodeScanner("reader", {
    qrbox: {height: 200, width: 200},
    rememberLastUsedCamera: true,
    fps: 1
})

scanner.render(success, error)

function success(result) {

    result = result.split("&")
    const id = result[0]
    const name = result[1]
    const store = result[2]
    const cargo = result[3]
    const date = new Date
    const datetime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
    // const party = result[4]

    const postData = `Data=${datetime}&Tipo=${bipType.innerHTML}&ID QR Code=${id}&Nome=${name}&Loja=${store}&Cargo=${cargo}`
    console.log("Dados Enviados")
    postGoogleSheet(postData)

    let response = document.querySelector("#scanner_output")
    response.innerHTML = `<b>Novo registro</b><br>${bipType.innerHTML} | ${name}`

    soundEffect.play()
}

function error(err) {
    // console.log(err)
}


// Sending data to Google Sheet
function postGoogleSheet(qrcode) {
    fetch(
        "https://script.google.com/macros/s/AKfycbw8hvvx9Gc6iLvKCU0uw8GNb0HDFaY4Gz7vbkQcXPZzymxNEdzCybx_rLxzQVHPv8AF/exec",
        {
          redirect: "follow",
          method: "POST",
          body: qrcode,
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
        }
      )
}
