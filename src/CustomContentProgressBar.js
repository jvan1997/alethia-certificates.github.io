import React from "react"
import CircularProgressBar from "react-circular-progressbar"
import './progress-bar-styles.css';
import './CustomContentProgressBar.css';


function CustomContentProgressBar(props) {
    const { children, ...otherProps } = props;

    return (
        <div className="CustomContentProgressBar">

            <div style={{ position: "absolute" }}>
                <CircularProgressBar {...otherProps} />
            </div>
            <div style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
            >
                <div className="CustomContentProgressBar-Children">
                {props.children}
                </div>
            </div>

        </div>
    )
}

export default CustomContentProgressBar