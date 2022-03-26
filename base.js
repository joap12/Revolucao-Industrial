
    (async () => {
        const inputOptions = new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              'a': 'a',
              'b': 'b',
              'c': 'c',
              'd': 'd'
            })
          }, 1000)
        })
        const { value: color } = await Swal.fire({
          title: 'Questão x',
          text: '',
          input: 'radio',
          inputOptions: inputOptions,
          customClass: { popup: 'format-pre'},
          inputValidator: (value) => {
            if (!value) {
                return 'Você precisa escolher alguma alternativa!'
            }
          }
        })
        
        if (color == 'x') {
            sound.play();
          Swal.fire({
            icon: 'success',
            title: 'Parabéns Você Acertou a Questão',
            html: ``,
            footer: '<img src="https://www.otempo.com.br/image/contentid/policy:1.2627146:1646655744/image.jpg?f=3x2&w=1200&$p$f$w=a9f248b" height="225px">'
            })
          acertos++;
        }
        else {
            nakuludu.play();
          Swal.fire({  
            icon: 'error',
            title: 'Que Pena, Você Errou a Questão',
            html: ``,
            footer: '<img src="https://img.ifunny.co/images/c519bf7599080a0d7fcf8d8b79a2119a0939a617713bd35c98932293766e7e89_1.jpg" height="225px">'
             })
        }    
    })();
