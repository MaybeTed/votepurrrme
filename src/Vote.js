
import React from 'react';
import ReactDOM from 'react-dom';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import Nav from './Nav';

class Vote extends React.Component {
	constructor() {
		super();
		this.state = {
      pictures: [
        // 'cats/50_la9sco.jpg',
        // 'cats/49_hazecf.jpg',
        // 'cats/48_yhmfil.jpg',
        '47_kkmom8.jpg',
        '46_oapqwg.jpg',
        '45_tx6wg4.jpg',
        '44_e9x4p9.jpg',
        '43_h1ubrv.jpg',
        '42_bepuwd.jpg',
        '41_l2gr4c.jpg',
        '40_e78hqk.jpg',
        '39_avdn3b.jpg',
        '38_bdvoap.jpg',
        '37_mw8m2y.jpg',
        '36_z3xlnb.jpg',
        '35_s1khjj.jpg',
        '34_ik1rzz.jpg',
        '33_xgf2cx.jpg',
        '32_ot79ny.jpg',
        '31_s3txnc.jpg',
        '30_npss4d.jpg',
        '29_i8cyfo.jpg',
        '28_ybzbrr.jpg',
        '27_g536jo.jpg',
        '26_s6cqkh.jpg',
        '25_st90fx.jpg',
        '24_wsfrit.jpg',
        '23_h9ssei.jpg',
        '22_khs6d8.jpg',
        '21_o6tfqb.jpg',
        '20_vft97j.jpg',
        '19_uy49td.jpg',
        '18_ppx8fb.jpg',
        '17_tabx5x.jpg',
        '16_udfcaf.jpg',
        '15_lxd8ct.jpg',
        '14_zjnyui.jpg',
        '13_pnykfx.jpg',
        '12_pacomx.jpg',
        '11_mphfjf.jpg',
        '10_cl76ry.jpg',
        '9_dntegz.jpg',
        '8_s6bfxv.jpg',
        '7_n03l1n.jpg',
        '6_u3dg5w.jpg',
        '5_c8k6vm.jpg',
        '4_qeb480.jpg',
        '3_xngijk.jpg',
        '2_dry4ds.jpg',
        '1_dxnpg9.jpg',
        '0_odlzif.jpg'
      ],
      current: []
		}
		this.getNewCats = this.getNewCats.bind(this);
	}

	componentDidMount() {
      this.getNewCats();
	}

	getNewCats() {
	  const index = Math.floor(Math.random() * this.state.pictures.length);
      let pictures = this.state.pictures.slice();
      const pic1 = pictures.splice(index, 1);
      const index2 = Math.floor(Math.random() * pictures.length);
      const pic2 = pictures.splice(index2, 1);
      this.setState({ current: [pic1, pic2] }, () => console.log(this.state.current));
	}

	render() {
		return (
			<div>
    	      <div className="main-page">
    	        <h3 className="title">Click your favorite cat</h3>
    		      <div className="competition-cat">
    		        <img src={`https://res.cloudinary.com/dj2e9orvq/image/upload/${this.state.current[0]}`} onClick={this.getNewCats} />
    		        <img src={`https://res.cloudinary.com/dj2e9orvq/image/upload/${this.state.current[1]}`} onClick={this.getNewCats} />
    		      </div>
    	      </div>
            </div>
		)
	}
}

export default Vote;
