frappe.ui.form.on('Customer', {
	refresh(frm) {
		frappe.call({
			method: 'frappe.client.get_value',
			args: {
				'doctype': 'VAT ID Check',
				'filters': {'party': frm.doc.customer_name},
				'fieldname': ['party_vat_id']
			},
			callback: function (r) {
				if (r.message) {
					//console.log("---------->",r.message.party_vat_id);
					var messageEmpty = (Object.keys(r.message).length === 0 && r.message.constructor === Object);

					if (messageEmpty && (!frm.doc.vat_id_no || frm.doc.vat_id_no === 'undefined' || frm.doc.vat_id_no === "")) {
						//console.log("Both empty. Nothing to do");
					}
					else if (!messageEmpty && frm.doc.vat_id_no && frm.doc.vat_id_no === r.message.party_vat_id) {
						//console.log("Both match. Nothing to do");
					}
					else {
						frm.fields_dict['register_sb_1'].wrapper.css('background-color', 'red');
						if (!messageEmpty) {
							frm.add_custom_button(__("Update VAT-ID"), function () {
								frm.set_value('vat_id_no', r.message.party_vat_id);
								$("div[data-fieldname='register_sb_1']").css({'background-color': ''});
							});
						} else {
							frm.add_custom_button(__("Clear VAT-ID"), function () {
								frm.set_value('vat_id_no', '');
								$("div[data-fieldname='register_sb_1']").css({'background-color': ''});
							});
							frm.add_custom_button(__("Add VAT-ID Check"), function () {
								frappe.route_options = {"party_type": frm.doc.doctype, "party": frm.doc.name, "party_vat_id": frm.doc.vat_id_no};  // Übergeben Sie die Kunden-ID
								frappe.set_route("Form", "VAT ID Check", "new-vat-id-check");  // Öffnen Sie das Formular im neuen Tab
							});
						}
						msgprint("Mismatch between the VAT data!");
					}
				}
			}
		});
	}
});
