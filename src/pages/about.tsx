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
          <strong>Miles Shebar</strong> graduates this year from Kenyon College, where he was featured in numerous plays
          and films. His mainstage credits include Tom Stoppard’s <em>Rosencrantz & Guildenstern Are Dead</em>{' '}
          (Guildenstern), <em>The Comedy of Errors</em> (Dromio), and <em>When We Were Young and Unafraid</em> (Paul).
          Other credits include <em>Legally Blonde</em> (Warner), <em>Late: A Cowboy Song</em> (Crick),{' '}
          <em>The Importance of Being Earnest</em> (Lane/Merriman), and <em>Trudy & Max In Love</em> (Max). He appeared
          in a staged reading of Diana Nneka Atuona's new play <em>The Boy from the Bay</em> at the Kenyon Playwrights
          Conference.
        </Bio>
        <Bio>
          Miles is also an alumnus of the British American Dramatic Academy's Midsummer in Oxford intensive program,
          where he performed scenes from <em>The Resistible Rise of Arturo Ui</em> and <em>Richard III</em>.
        </Bio>
        <Bio>
          His voice acting was recently featured in two episodes of the <em>New York Times</em>'s Webby Award-winning
          animated series <em>Trump Bites</em>, which Sean Hannity called “despicable”.
        </Bio>
        <Bio>
          Miles is excited to be home in New York, albeit earlier than planned, ready to pursue his lifelong passion.
        </Bio>
        {/*<Bio>
          Manager:{' '}
          <a href="https://bercytalent.com" target="_blank" rel="noopener noreferrer">
            Jason Bercy
          </a>
        </Bio>*/}
        <Bio>Contact: miles [dot] shebar [at] g mail [dot] com</Bio>
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
