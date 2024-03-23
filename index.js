
// default values and initialization
document.querySelector("#scanner_output").style = "display: none;"
const soundEffect = new Audio("/footage/pop.mp3")
let bipType = window.document.querySelector("#bip_type")
bipType.innerHTML = "ENTRADA"

// Menu config
document.querySelector("#bip_btn").addEventListener("click", function changeBipType() {
    if (bipType.innerHTML === "ENTRADA") {
        bipType.innerHTML = "SAÍDA"
        document.querySelector("body").style = "background-color: tomato"
    } else if (bipType.innerHTML === "SAÍDA") {
        bipType.innerHTML = "REFEITÓRIO"
        document.querySelector("body").style = "background-color: #fdda4f"
    } else {
        bipType.innerHTML = "ENTRADA"
        document.querySelector("body").style = "background-color: #afff36"
    }
})

document.querySelector("#scanner_output").addEventListener("click", function clearOutput() {
    if (document.querySelector("#scanner_output").style.display != "none") {
        document.querySelector("#scanner_output").style = "display: none;"
    }
})


// QR code config
const scanner = new Html5QrcodeScanner("reader", {
    qrbox: {height: 200, width: 200},
    rememberLastUsedCamera: true,
    fps: 1
})

scanner.render(success, error)

let lastData = ''
function success(result) {

    // Data from URL
    result = result.split("&")
    const id = result[0]
    const name = result[1]
    const storeId = result[2]
    const storePerfil = result[3]
    const cidade = result[4]
    const cargo = result[5]
    const date = new Date
    const datetime = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`

    // "POST" Google Sheet
    if (document.querySelector("#scanner_output").style.display === "none") {
        const postData = `Data=${datetime}&Tipo=${bipType.innerHTML}&ID QR Code=${id}&Nome=${name}&Loja=${store}&Cidade=${cidade}&Cargo=${cargo}`
        console.log("Dados Enviados")
        postGoogleSheet(postData)
        
        // Feedback
        let response = document.querySelector(".output_message")
        document.querySelector("#scanner_output").style = "display: flex;"
        response.innerHTML = `<p><b style="Font-size: 1.5rem; border-bottom: 1px solid black; padding: 10px 0px">Novo Registro 🚀</b><hr><br>${name} <b>(${bipType.innerHTML})</b></p>`
        soundEffect.play()
    }
    
}

function error(err) {
    console.log(err)
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
