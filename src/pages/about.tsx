import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { config, useSpring } from 'react-spring'
import Layout from '../components/layout'
import { AnimatedBox } from '../elements'
import SEO from '../components/SEO'
import { ChildImageSharp } from '../types'

type PageProps = {
  data: {
    aboutMe: ChildImageSharp
  }
}

const Headshot = styled(Img)`
  max-width: 625px;
  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    max-width: 100%;
  }
`

const Bio = styled.p`
  width: 625px;
  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    width: 100%;
  }
`

const About: React.FunctionComponent<PageProps> = ({ data: { aboutMe } }) => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <Layout>
      <SEO title="About | Miles Shebar" desc="Miles Shebar is an actor from New York, NY." />
      <AnimatedBox style={pageAnimation} py={[6, 6, 6, 8]} px={[6, 6, 8, 6, 8, 13]}>
        <h1>About</h1>
        <Headshot fluid={aboutMe.childImageSharp.fluid} />
        <Bio>
          <strong>Miles Shebar</strong> is an actor from New York, NY and soon-to-be graduate of Kenyon College. At
          Kenyon he performed regularly, appearing in mainstage productions of <em>When We Were Young and Unafraid</em>,{' '}
          <em>Rosencrantz & Guildenstern Are Dead</em>, and <em>The Comedy of Errors</em>, as well as many student films
          and productions like <em>Legally Blonde</em> and{' '}
          <a href="https://vimeo.com/315581918" target="_blank" rel="noopener noreferrer">
            <em>Much Ado About (Literally Nothing)</em>
          </a>
          . In 2017 he appeared in a staged reading of Diana Nneka Atuona's new play <em>The Boy from the Bay</em> at the Kenyon Playwrights Conference.
        </Bio>

        <Bio>
          Manager:{' '}
          <a href="https://bercytalent.com" target="_blank" rel="noopener noreferrer">
            Jason Bercy
          </a>
        </Bio>
      </AnimatedBox>
    </Layout>
  )
}

export default About

export const query = graphql`
  query About {
    aboutMe: file(sourceInstanceName: { eq: "images" }, name: { eq: "about-us" }) {
      childImageSharp {
        fluid(quality: 95, maxWidth: 1200) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
  }
`
