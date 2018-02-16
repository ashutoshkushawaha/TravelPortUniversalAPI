if (!window.webapp) {
    window.webapp = {};
}
var ColArray = [0, 1, 2];
var hideFromExport = [3];
window.webapp.domesticFlight = (function ($) {
    var table;

 
    var onDocumentReady = function () {
        initUI();
        initEvent();
    },

    initUI = function () {
    },
    initEvent = function () {
        //btnCreate.on('click', addEntity);
        //viewtable.on('click', '.btn_edit', getEditEnity);
        //viewtable.on('click', '.btn_delete', deleteEntity);
        $("#btnSubmit").on('click', checkTicket);
    },
    addEntity = function (event) {
        event.preventDefault();
        var url = $(this).attr('data-href');
        $.get(url, function (data) {
            frmDialogCreate.find('div.modal-body').html(data);
            frmDialogCreate.find('.heading ').html('Create Book Code');
            initValidation(frmDialogCreate);
        }).success(function () {
            $('.ModalCreatePopUp').addClass('show');
            $('body').addClass('scroll-hide');
            $('input:text:visible:first').focus();
        });
    },
    getEditEnity = function (event) {
        var $d = $.Deferred();
        var id = $(this).parent().attr("data-id");
        var url = "/BookCode/EditBookCode" + "?id=" + id;
        $.ajax(url).done(function (data) {
            $d.resolve(data);
            frmDialogCreate.find('div.modal-body').html('');
            frmDialogEdit.find('div.modal-body').html(data);
            frmDialogEdit.find('.heading ').html('Edit Book Code');
            initValidation(frmDialogEdit);
            $('.ModalEditPopUp').addClass('show');
            $('body').addClass('scroll-hide');
            $('input:text:visible:first').focus();

        }).fail(function (data) {
            $d.reject(data);
        });
        return $d.promise();
    },
    updateBookCode = function (event) {
        var model = {
            Id: '',
            BookCodeName: '',
            BookCodeDescription: ''
        }
        model.Id = $("#Id").val();
        model.BookCodeName = $("#BookCodeName").val();
        model.BookCodeDescription = $("#BookCodeDescription").val();
        var $form = frmDialogEdit.find('#EditBookCodeForm');
        if ($form.length > 0) {
            if ($form.valid()) {
                event.preventDefault();
                $.ajax({
                    url: '/BookCode/UpdateBookCode',
                    type: "Post",
                    data: JSON.stringify(model),
                    dataType: "json",
                    contentType: "application/json"

                }).done(function (response) {
                    $('.ModalEditPopUp').removeClass('show');
                    if (response.success === true) {
                        table.fnDraw();
                        notification("success", response.message);
                    }
                    else if (response.success === false) {
                        notification("error", response.message);
                    }
                    else {
                        toastr.error(response.message)
                    }
                }).fail(function (response) {
                    console.log(response);
                    toastr.error("Error occured while processing your request!!")
                });
            }
        }
    },
    checkTicket = function (event) {
        var $d = $.Deferred();
        var model = {
            BookCodeName: '',
            BookCodeDescription: ''
        }
        model.BookCodeName = $("#BookCodeName").val();
        model.BookCodeDescription = $("#BookCodeDescription").val();
        var $form = frmDialogCreate.find('#CreateBookCodeForm');
        if ($form.length > 0) {
            if ($form.valid()) {
                event.preventDefault();
                $.ajax({
                    url: '/BookCode/SaveBookCode',
                    type: "POST",
                    data: JSON.stringify(model),
                    dataType: "json",
                    contentType: "application/json; charset=utf-8"
                }).done(function (response) {
                    $('.ModalCreatePopUp').removeClass('show');
                    $d.resolve(response);
                    if (response.success === true) {
                        table.fnDraw();
                        notification("success", response.message);
                    }
                    else if (response.success === false) {
                        toastr.error(response.message)
                    }
                    else {
                        toastr.error(response.message)
                    }

                }).fail(function (response) {
                    $d.reject(response);
                    toastr.error("Error occured while processing your request!!")
                });
            }
        }
        return $d.promise();
    },
    deleteEntity = function (e) {
        var $d = $.Deferred();
        e.preventDefault();
        var id = $(this).parent().data('id');
        if (confirm("Are you sure you want to delete this Book Code?")) {
            $.ajax({
                type: "POST",
                url: "/BookCode/DeleteBookCode",
                dataType: "JSON",
                data: { id: id }
            }).done(function (response) {
                if (response.success === true) {
                    $d.resolve(response);
                    table.fnDraw();
                    notification("success", response.message);
                } else if (response.result == "Error") {
                    $d.resolve(response);
                    toastr.error(response.message)
                } else {
                    $d.resolve(response);
                    toastr.error(response.message)
                }
            }).fail(function (response) {
                toastr.error("Error occured while processing your request!!")
            });
        }
        return $d.promise;
    },
    reloadData = function () {
        table.fnDraw();
    }
    initValidation = function (frmDialog) {
        var form = frmDialog.find('div.modal-body').find("form");
        form.removeData('validator');
        form.removeData('unobtrusiveValidation');
        $.validator.unobtrusive.parse(form);
    };

    return {
        onDocumentReady: onDocumentReady
    };
}(jQuery));

jQuery(webapp.domesticFlight.onDocumentReady);
function RefreshTableButtons() {
    ($($(".dt-buttons").children()).each(function (html, data) {
        if (data != '') {
            $("ul.buttons[id!='upper']").prepend($("<li></li>").html(data));
        }
    }));
}
