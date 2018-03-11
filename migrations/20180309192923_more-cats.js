
exports.up = function(knex, Promise) {
  return knex('cats').insert([
    { name: 'Eyes-Open Cat', url: 'cat1_zlyp0n.jpg' },
    { name: 'Smushed Cat', url: 'cat2_dnsrqi.jpg' },
    { name: 'Growl Cat', url: 'cat3_ikcptf.jpg' },
    { name: 'Stuck Cat', url: 'cat5_vqipiu.jpg' },
    { name: 'Selfie Cat', url: 'cat6_fsfagb.jpg' },
    { name: 'Volcano Cat', url: 'cat8_wyn82e.jpg' },
    { name: 'KFC Cat', url: 'cat10_sgqfsr.jpg' },
    { name: 'Sink Cat', url: 'cat11_l1s0u5.jpg' },
    { name: 'Glass Table Cat', url: 'cat12_it9qkd.jpg' },
    { name: 'Monorail Cat', url: 'cat13_zlfqls.jpg' },
    { name: 'Grumpy Cat', url: 'cat14_eferzb.jpg' },
    { name: 'Alert Cat', url: 'cat15_sydsdw.jpg' },
    { name: 'Hat Cat', url: 'cat16_amgmux.jpg' },
    { name: 'Attack Cat', url: 'cat7_piqpej.jpg' },
    { name: 'Bowl Cat', url: 'cat4_s63fit.jpg' }
  ])
};

exports.down = function(knex, Promise) {
  return knex('cats').del();
};
