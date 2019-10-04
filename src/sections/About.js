import React from "react";
import { Box, Image, Flex } from "rebass";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import Fade from "react-reveal/Fade";
import Section from "../components/Section";
import Triangle from "../components/Triangle";
import markdownRenderer from "../components/MarkdownRenderer";
import family_photo from "../../media/family.png";

const Background = () => (
  <div>
    <Triangle
      color="backgroundDark"
      height={["50vh", "20vh"]}
      width={["50vw", "50vw"]}
      invertY
    />

    <Triangle
      color="primaryDark"
      height={["20vh", "40vh"]}
      width={["75vw", "70vw"]}
      invertX
    />

    <Triangle
      color="backgroundDark"
      height={["25vh", "20vh"]}
      width={["100vw", "100vw"]}
    />
  </div>
);

const ProfilePicture = styled(Image)`
  border-radius: 50%;
  border: 3px solid ${props => props.theme.colors.profile_pic_border};
  transition: all 0.25s ease-out;

  &:hover {
    border-radius: 20%;
  }
`;

const About = () => (
  <Section.Container id="about" Background={Background}>
    <Section.Header name="About Me" icon="🤗" label="person" />
    <StaticQuery
      query={graphql`
        query AboutMeQuery {
          contentfulAbout {
            aboutMe {
              childMarkdownRemark {
                rawMarkdownBody
              }
            }
            profile {
              title
              image: resize(width: 500, quality: 100) {
                src
              }
            }
          }
        }
      `}
      render={data => {
        const { aboutMe } = data.contentfulAbout;
        return (
          <Flex justifyContent="center" alignItems="center" flexWrap="wrap">
            <Box width={[1, 1, 4 / 6]} px={[1, 2, 4]}>
              <Fade bottom>
                <ReactMarkdown
                  source={aboutMe.childMarkdownRemark.rawMarkdownBody}
                  renderers={markdownRenderer}
                />
              </Fade>
            </Box>

            <Box
              width={[1, 1, 2 / 6]}
              style={{ maxWidth: "300px", margin: "auto" }}
            >
              <Fade right>
                <ProfilePicture
                  src={family_photo}
                  alt="Tico's family (minus Wynnie)"
                  mt={[4, 4, 0]}
                  ml={[0, 0, 1]}
                />
              </Fade>
            </Box>
          </Flex>
        );
      }}
    />
  </Section.Container>
);

export default About;
