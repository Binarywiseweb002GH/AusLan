/**
 * Custom Contact Form Handler (Updated for your form)
 * Fields: name, email, number, message
 */

(function($) {
    'use strict';

    var contactForm = {
        form: '.ajax-contact',
        invalidCls: 'is-invalid',
        validation: '[name="name"],[name="email"],[name="number"],[name="message"]',
        emailField: '[name="email"]',
        messages: $('.form-messages'),

        // EmailJS INFO — REPLACE WITH YOUR VALUES
        emailjsConfig: {
            serviceId: 'service_ldbswhm',
            templateId: 'template_eyqddl9',
            publicKey: 'rf8opFDE0m8LOp-lE'
        },

        init: function() {
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

                // Form data (NO SUBJECT)
                var formData = {
                    name: $(this.form + ' [name="name"]').val(),
                    email: $(this.form + ' [name="email"]').val(),
                    number: $(this.form + ' [name="number"]').val(),
                    message: $(this.form + ' [name="message"]').val()
                };

                // EmailJS available?
                if (window.emailjs && this.emailjsConfig.publicKey) {
                    this.sendWithEmailJS(formData);
                } else {
                    console.log('EmailJS not configured. Data:', formData);
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

            $(this.form + ' input, ' + this.form + ' textarea')
                .removeClass(this.invalidCls);

            var fields = this.validation.split(',');
            fields.forEach(function(field) {
                var $field = $(self.form + ' ' + field.trim());
                if (!$field.val().trim()) {
                    $field.addClass(self.invalidCls);
                    isValid = false;
                }
            });

            // Validate email format
            var emailValue = $(this.emailField).val();
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailValue || !emailRegex.test(emailValue)) {
                $(this.emailField).addClass(this.invalidCls);
                isValid = false;
            }

            if (!isValid) {
                this.showError('Please fill in all required fields correctly.');
            }

            return isValid;
        },

        showLoading: function() {
            this.messages.removeClass('error success');
            this.messages.addClass('loading');
            this.messages.html('<i class="fas fa-spinner fa-spin"></i> Sending message...');
            $(this.form + ' button[type="submit"]').prop('disabled', true);
        },

        showSuccess: function() {
            this.messages.removeClass('error loading');
            this.messages.addClass('success');
            this.messages.html('<i class="fas fa-check-circle"></i> Message sent successfully!');
            $(this.form + ' button[type="submit"]').prop('disabled', false);
        },

        showDemoMessage: function() {
            this.messages.removeClass('error loading');
            this.messages.addClass('success demo');
            this.messages.html('<i class="fas fa-info-circle"></i> Demo mode enabled. EmailJS not configured.');
            $(this.form + ' button[type="submit"]').prop('disabled', false);
        },

        showError: function(message) {
            this.messages.removeClass('success loading');
            this.messages.addClass('error');
            this.messages.html('<i class="fas fa-exclamation-circle"></i> ' + message);
            $(this.form + ' button[type="submit"]').prop('disabled', false);
        },

        clearForm: function() {
            $(this.form + ' input, ' + this.form + ' textarea').val('');
            $(this.form + ' input, ' + this.form + ' textarea').removeClass(this.invalidCls);
        },

        sendWithEmailJS: function(formData) {
            var self = this;

            emailjs.send(
                this.emailjsConfig.serviceId,
                this.emailjsConfig.templateId,
                {
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
                self.showError('Failed to send email. Try again later.');
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
