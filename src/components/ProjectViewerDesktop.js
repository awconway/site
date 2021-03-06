import React from "react";
import {Slide, Fade} from "react-reveal";
import Img from "gatsby-image";
import chroma from "chroma-js";
import classNames from "classnames";


import ProjectIcon from "./ProjectIcon";
// import PlainFrame from "./PlainFrameDesktop";

import "./ProjectViewerDesktop.module.css";

const ProjectViewerDesktop = ({project}) => {
    const backgroundColor = project.color || "#ccc";
    // See https://github.com/gka/chroma.js/issues/181#issuecomment-423884867
    const isDarkBackground = chroma(backgroundColor).get("lab.l") < 80;

    return (
        <div
            className="js-color-stop"
            data-background-color={backgroundColor}
            styleName="snap"
            style={{height: "100vh"}}
        >
            <div styleName="project">
                <div styleName="inner-container">
                    <div styleName="background">
                        <Slide right>
                            <div
                                styleName={classNames("background-text", {
                                    dark: !isDarkBackground,
                                })}
                            >
                                {project.name}
                            </div>
                        </Slide>
                        <div styleName="background-banner"/>
                    </div>
                    <div styleName="slide first-slide">
                        <Fade bottom>
                            <h2 styleName={classNames("title", {dark: !isDarkBackground})}>
                                {project.name}
                            </h2>
                        </Fade>

                        <Slide left>
                            <div styleName="icon-container">
                                <ProjectIcon
                                    icon={project.icon}
                                    prerendered={project.prerenderedIcon}
                                />
                                <p styleName="description">{project.description}</p>
                            </div>
                        </Slide>
                        <Fade right>
                            <ul
                                styleName={classNames("keywords", {dark: !isDarkBackground})}
                            >
                                {project.keywords.map(keyword => (
                                    <li>{keyword}</li>
                                ))}
                            </ul>
                        </Fade>
                    </div>
                    <div styleName="photos">
                    {project.screenshots && (
                        <Slide right>
                            <div/>
                            {project.screenshots.map(({ image, link}) => {
                                // let ImgContainer = PlainFrame

                                // const {
                                //     aspectRatio,
                                //     presentationWidth,
                                //     presentationHeight,
                                // } = image.childImageSharp.fluid;

                                return (
                                    <div key={image.id} >
                                        {/* <ImgContainer
                                            landscape={aspectRatio > 1}
                                            aspectRatio={aspectRatio}
                                        > */}
                                            <a href={link} target="_blank" rel="noreferrer">
                                                <Img
                                                    fixed={{
                                                        ...image.childImageSharp.fixed,
                                                        // Hint the best image size to use
                                                        // default assumes 100vw which is wrong for us and ends up loading a version that's too big/heavy
                                                        // sizes: `(min-aspect-ratio: ${presentationWidth}/${presentationHeight}) calc(80vh * ${aspectRatio}), 90vw`,
                                                        // maxWidth: 250
                                                    }}
                                                />
                                            </a>
                                        {/* </ImgContainer> */}
                                    </div>
                                );
                            })}
                        </Slide>
                    )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectViewerDesktop;
