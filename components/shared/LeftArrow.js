import React from 'react'
import config from '../../config';
import styles from '../../theme/app.scss';


export default class LeftArrow extends React.Component {

    constructor(props) {
        super(props);

        this.state = { src: config.s3bucket_shopping_resources + 'arrowleft.png'};
    }

    render(){
        
        return (
                <img className={styles.arrowSize}
                    onMouseOver={() => {
                        this.setState({ src: config.s3bucket_shopping_resources + 'arrowleft-fill.png'})
                     }} 
                    onMouseOut={() => {
                        this.setState({ src: config.s3bucket_shopping_resources + 'arrowleft.png'})
                     }} 

                     onClick={() =>{
                        this.props.onArrowClicked()
                        this.setState({ src: config.s3bucket_shopping_resources + 'arrowleft.png'})
                       }}
                       src={this.props.disabled ? config.s3bucket_shopping_resources + 'arrowleftgrey.png' : this.state.src} />
        );
    }
  };

  