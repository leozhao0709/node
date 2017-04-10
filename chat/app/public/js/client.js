function showMsg(type) {
    if (type === 1) {
        $.scojs_message("This is an info message", $.scojs_message.TYPE_OK);
    }
    else {
        $.scojs_message("This is an info message", $.scojs_message.TYPE_ERROR);
    }
}