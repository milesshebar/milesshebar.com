import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { animated, useSpring, config } from 'react-spring'
import Layout from '../components/layout'
import GridItem from '../components/grid-item'
import SEO from '../components/SEO'
import { ChildImageSharp } from '../types'

type PageProps = {
  data: {
    firstProject: {
      title: string
      slug: string
      cover: ChildImageSharp
    }
    threeProjects: {
      nodes: {
        title: string
        slug: string
        cover: ChildImageSharp
      }[]
    }
    aboutUs: ChildImageSharp
  }
}

const Area = styled(animated.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 35vw 40vw;
  grid-template-areas:
    'first-project about-us about-us'
    'three-projects three-projects three-projects';

  @media (max-width: ${props => props.theme.breakpoints[3]}) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 35vw 30vw 20vw;

    grid-template-areas:
      'first-project first-project about-us about-us'
      'three-projects three-projects three-projects three-projects'
      'three-projects three-projects three-projects three-projects';
  }
  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    grid-template-rows: 35vw 30vw 30vw;
  }
  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 38vw);

    grid-template-areas:
      'first-project about-us'
      'three-projects three-projects'
      'three-projects three-projects'
      'three-projects three-projects';
  }

  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(5, 50vw);

    grid-template-areas:
      'about-us'
      'first-project'
      'three-projects'
      'three-projects'
      'three-projects';
  }
`

const FirstProject = styled(GridItem)`
  grid-area: first-project;
`

const AboutUs = styled(GridItem)`
  grid-area: about-us;
`

const ThreeProjects = styled.div`
  grid-area: three-projects;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`

const Index: React.FunctionComponent<PageProps> = ({ data: { firstProject, threeProjects, aboutUs } }) => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <Layout>
      <SEO />
      <Area style={pageAnimation}>
        <FirstProject to={firstProject.slug} aria-label={`View project "${firstProject.title}"`}>
          <Img fluid={firstProject.cover.childImageSharp.fluid} />
          <span>{firstProject.title}</span>
        </FirstProject>
        <AboutUs to="/about" aria-label="Visit my about page">
          <Img fluid={aboutUs.childImageSharp.fluid} />
          <span>About</span>
        </AboutUs>
        <ThreeProjects>
          {threeProjects.nodes.map(portfolio => (
            <GridItem to={portfolio.slug} key={portfolio.slug} aria-label={`View project "${portfolio.title}"`}>
              <Img fluid={portfolio.cover.childImageSharp.fluid} />
              <span>{portfolio.title}</span>
            </GridItem>
          ))}
        </ThreeProjects>
      </Area>
    </Layout>
  )
}

export default Index

export const query = graphql`
  query Index {
    firstProject: portfolioYaml {
      title
      slug
      cover {
        childImageSharp {
          fluid(quality: 95, maxWidth: 1200) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
    threeProjects: allPortfolioYaml(limit: 3, skip: 1) {
      nodes {
        title
        slug
        cover {
          childImageSharp {
            fluid(quality: 95, maxWidth: 1200) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
    aboutUs: file(sourceInstanceName: { eq: "images" }, name: { eq: "about-us" }) {
      childImageSharp {
        fluid(quality: 95, maxWidth: 1200) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
