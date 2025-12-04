(function($) {
    'use strict';

    var contactForm = {
        form: '.ajax-contact',
        invalidCls: 'is-invalid',
        validation: '[name="name"],[name="email"],[name="number"],[name="message"]',
        emailField: '[name="email"]',
        messages: $('<p class="form-messages mb-0 mt-3"></p>'), // We'll append dynamically if not present

        emailjsConfig: {
            serviceId: 'service_ldbswhm',    // Your EmailJS Service ID
            templateId: 'template_eyqddl9',  // Your EmailJS Template ID
            publicKey: 'rf8opFDE0m8LOp-lE'  // Your EmailJS Public Key
        },

        init: function() {
            // Append message container if not present
            if ($(this.form + ' .form-messages').length === 0) {
                $(this.form).append(this.messages);
            } else {
                this.messages = $(this.form + ' .form-messages');
            }
            this.bindEvents();
        },

        bindEvents: function() {
            var self = this;
            $(this.form).on('submit', function(e) {
                e.preventDefault();
                self.handleSubmit();
            });
        },

        handleSubmit: function() {
            var self = this;

            if (this.validateForm()) {
                this.showLoading();

                var formData = {
                    name: $(this.form + ' [name="name"]').val(),
                    email: $(this.form + ' [name="email"]').val(),
                    number: $(this.form + ' [name="number"]').val(),
                    message: $(this.form + ' [name="message"]').val()
                };

                if (window.emailjs && this.emailjsConfig.publicKey && this.emailjsConfig.publicKey !== 'YOUR_PUBLIC_KEY_HERE') {
                    this.sendWithEmailJS(formData);
                } else {
                    console.log('EmailJS not configured. Form data:', formData);
                    setTimeout(function() {
                        self.showDemoMessage();
                        self.clearForm();
                    }, 1500);
                }
            }
        },

        validateForm: function() {
            var isValid = true;
            var self = this;

            $(this.form + ' input, ' + this.form + ' textarea').removeClass(this.invalidCls);

            var fields = this.validation.split(',');
            fields.forEach(function(field) {
                var $field = $(self.form + ' ' + field.trim());
                if (!$field.val().trim()) {
                    $field.addClass(self.invalidCls);
                    isValid = false;
                }
            });

            var emailValue = $(this.form + ' ' + this.emailField).val();
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailValue || !emailRegex.test(emailValue)) {
                $(this.form + ' ' + this.emailField).addClass(this.invalidCls);
                isValid = false;
            }

            if (!isValid) {
                this.showError('Please fill in all required fields with valid information.');
            }

            return isValid;
        },

        showLoading: function() {
            this.messages.removeClass('error success');
            this.messages.addClass('loading');
            this.messages.html('<i class="fas fa-spinner fa-spin"></i> Sending your message...');
            $(this.form + ' button[type="submit"]').prop('disabled', true);
        },

        showSuccess: function() {
            this.messages.removeClass('error loading');
            this.messages.addClass('success');
            this.messages.html('<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.');
            $(this.form + ' button[type="submit"]').prop('disabled', false);
        },

        showDemoMessage: function() {
            this.messages.removeClass('error loading');
            this.messages.addClass('success demo');
            this.messages.html('<i class="fas fa-info-circle"></i> <strong>Demo Mode:</strong> Form validation works! Configure EmailJS to send emails.');
            $(this.form + ' button[type="submit"]').prop('disabled', false);
        },

        showError: function(message) {
            this.messages.removeClass('success loading');
            this.messages.addClass('error');
            this.messages.html('<i class="fas fa-exclamation-circle"></i> ' + message);
            $(this.form + ' button[type="submit"]').prop('disabled', false);
        },

        clearForm: function() {
            $(this.form + ' input:not([type="submit"]), ' + this.form + ' textarea').val('');
            $(this.form + ' input, ' + this.form + ' textarea').removeClass(this.invalidCls);
        },

        sendWithEmailJS: function(formData) {
            var self = this;

            emailjs.send(
                this.emailjsConfig.serviceId,
                this.emailjsConfig.templateId,
                {
                    to_name: 'Binarywise Team',
                    to_email: 'info@binarywise.io',
                    from_name: formData.name,
                    from_email: formData.email,
                    phone_number: formData.number,
                    message: formData.message,
                    reply_to: formData.email
                },
                this.emailjsConfig.publicKey
            ).then(function(response) {
                console.log('EmailJS Success:', response);
                self.showSuccess();
                self.clearForm();
            }, function(error) {
                console.error('EmailJS Error:', error);
                self.showError('Failed to send message. Please try again or contact us directly.');
            });
        }
    };

    $(document).ready(function() {
        if (contactForm.emailjsConfig.publicKey) {
            emailjs.init(contactForm.emailjsConfig.publicKey);
        }
        contactForm.init();
    });

})(jQuery);
