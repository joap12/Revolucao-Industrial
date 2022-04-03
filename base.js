
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
            footer: `${certo}`
            })
          acertos++;
        }
        else {
            nakuludu.play();
          Swal.fire({  
            icon: 'error',
            title: 'Que Pena, Você Errou a Questão',
            html: ``,
            footer: `${errado}`
             })
        }    
    })();
