// Copyright (c) 2023, ALYF GmbH and contributors
// For license information, please see license.txt

frappe.ui.form.on("VAT ID Check", {
	setup: function (frm) {
		frm.add_fetch("party", "vat_id_no", "party_vat_id");

		frappe.call({
			method: 'frappe.client.get_value',
			type: "POST",
			args: {
				'doctype': 'Company',
				'filters': {"vat_id_no": ""},
				'fieldname': ['vat_id_no']
			},
			callback: function (r) {
				//console.log("----> " + r.message)
				frm.set_query("party_type", function (doc) {
					if (r.message.vat_id_no === undefined) {
						return {
							filters: {
								name: ["in", ["Customer", "Supplier"]],
							},
						}
					} else {
						return {
							filters: {
								name: ["in", ["Customer", "Supplier", "Company"]],
							},
						}
					}
				});
			},
		});

		frm.set_query("party_address", function (doc) {
			return {
				query: "frappe.contacts.doctype.address.address.address_query",
				filters: {
					link_doctype: doc.party_type,
					link_name: doc.party,
				},
			};
		});
	},
});
