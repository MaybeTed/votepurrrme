
exports.up = function(knex, Promise) {
  return knex('cats').insert([
    { name: 'Cheese Cat', url: '0_odlzif.jpg' },
    { name: 'Box Cat', url: '1_dxnpg9.jpg' },
    { name: 'Loading Cat', url: '2_dry4ds.jpg' },
    { name: 'Walking Cat', url: '3_xngijk.jpg' },
    { name: 'Driving Cat', url: '4_qeb480.jpg' },
    { name: 'Pillow Cat', url: '5_c8k6vm.jpg' },
    { name: 'Tuxedo Cat', url: '6_u3dg5w.jpg' },
    { name: 'Snowman Cat', url: '7_n03l1n.jpg' },
    { name: 'Toilet Cat', url: '8_s6bfxv.jpg' },
    { name: 'Logic Cats', url: '9_dntegz.jpg' },
    { name: 'Laugh Cat', url: '10_cl76ry.jpg' },
    { name: 'Copy Cat', url: '11_mphfjf.jpg' },
    { name: 'Wookie Cat', url: '12_pacomx.jpg' },
    { name: 'Strange Cat', url: '13_pnykfx.jpg' },
    { name: 'Derp Cat', url: '14_zjnyui.jpg' },
    { name: 'Regret Cat', url: '15_lxd8ct.jpg' },
    { name: 'Shower Cat', url: '16_udfcaf.jpg' },
    { name: 'Book Cat', url: '17_tabx5x.jpg' },
    { name: 'Grumpy Cat', url: '18_ppx8fb.jpg' },
    { name: 'Reading Cat', url: '19_uy49td.jpg' },
    { name: 'Moving In Cat', url: '20_vft97j.jpg' },
    { name: 'Home Alone Cat', url: '21_o6tfqb.jpg' },
    { name: 'Mistake Cat', url: '22_khs6d8.jpg' },
    { name: 'Round Cat', url: '23_h9ssei.jpg' },
    { name: 'Mario Cat', url: '24_wsfrit.jpg' },
    { name: 'Hover Cat', url: '25_st90fx.jpg' },
    { name: 'Snowbank Cat', url: '26_s6cqkh.jpg' },
    { name: 'Tree Cat', url: '27_g536jo.jpg' },
    { name: 'Marshmallow Cats', url: '28_ybzbrr.jpg' },
    { name: 'Beauty Parlor Cat', url: '29_i8cyfo.jpg' },
    { name: 'Trapped Cat', url: '30_npss4d.jpg' },
    { name: 'Toilet Cats', url: '31_s3txnc.jpg' },
    { name: 'Bloom Cat', url: '32_ot79ny.jpg' },
    { name: 'Sitting Cat', url: '33_xgf2cx.jpg' },
    { name: 'Barbie Cat', url: '34_ik1rzz.jpg' },
    { name: 'Fluffy Cat', url: '35_s1khjj.jpg' },
    { name: 'Grimacing Cat', url: '36_z3xlnb.jpg' },
    { name: 'Spider Cats', url: '37_mw8m2y.jpg' },
    { name: 'Batman Cat', url: '38_bdvoap.jpg' },
    { name: 'Kitten Army', url: '39_avdn3b.jpg' },
    { name: 'Knock Cat', url: '40_e78hqk.jpg' },
    { name: 'Towel Cat', url: '41_l2gr4c.jpg' },
    { name: 'Shark Cat', url: '42_bepuwd.jpg' },
    { name: 'Watermelon Cat', url: '43_h1ubrv.jpg' },
    { name: 'Vader Cat', url: '44_e9x4p9.jpg' },
    { name: 'Egg Cat', url: '45_tx6wg4.jpg' },
    { name: 'Hat Cat', url: '46_oapqwg.jpg' },
    { name: 'Water Cat', url: '47_kkmom8.jpg' }
  ])
};

exports.down = function(knex, Promise) {
  return knex('cats').del();
};
