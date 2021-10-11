import React from 'react'
import config from '../../config';
import styles from '../../theme/app.scss';

export default class RightArrow extends React.Component {

    constructor(props) {
        super(props);

        this.state ={ src: config.s3bucket_shopping_resources + 'arrowright.png'};
    }

    render(){
        
        return (
            <img className={styles.arrowSize}
                    onMouseOver={() => {
                        this.setState({ src: config.s3bucket_shopping_resources + 'arrowright-fill.png'})
                     }} 
                    onMouseOut={() => {
                        this.setState({ src: config.s3bucket_shopping_resources + 'arrowright.png'})
                     }} 

                     onClick={() =>{
                         this.props.onArrowClicked()
                         this.setState({ src: config.s3bucket_shopping_resources + 'arrowright.png'})
                        }}
                    src={this.props.disabled ? config.s3bucket_shopping_resources + 'arrowrightgrey.png' : this.state.src} />
        );
    }
  };

  