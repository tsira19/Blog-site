import React, { useState } from 'react';
import Footer from './Footer';
import Layout from './Layout';



const DropdownMenu = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <Layout/>
      <h2>Select an Option</h2>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">--Choose an option--</option>
        <option value="default">Default</option>
        <option value="with-cover">With Cover Image</option>
      </select>
    

      <div style={{ marginTop: '20px' }}>
        {selectedOption === 'default' && <div>Default Content</div>}
        <h1 className='textoffpage'>YOUR QUESTIONS HAVE BECOME MORE REDUNDANT</h1>
        <p className='textoff1'>By Madison Barnett  In Humans  March 17, 2024  2 Min Read  2 Comments</p>
        <span className='textone'>Uniquely monetize virtual leadership skills vis-a-vis parallel materials. Dramatically disintermediate excellent manufactured products for innovative partnerships. Enthusiastically exploit standards compliant customer service for premium initiatives. Phosfluorescently administrate best-of-breed content after granular experiences. Phosfluorescently redefine enterprise e-services with real-time outsourcing.
Rapidiously brand quality meta-services rather than distributed bandwidth. Interactively disintermediate economically sound e-services and intuitive internal or “organic” sources. Credibly expedite multidisciplinary processes for tactical information. Uniquely incubate interoperable communities with flexible solutions. Conveniently recaptiualize virtual testing procedures vis-a-vis open-source products.</span>
<h2>CONTINUALLY DRIVE LEADING EDGE MODELS</h2>
        {selectedOption === 'with-cover' && <div>Content with Cover Image</div>}
        <h1 className='texttwo' >SAMPLE PAGE</h1>
        <p className='textthree'> Appropriately productize installed base resources before 2.0 action items. Energistically orchestrate unique human capital with just in time functionalities. Compellingly pontificate user friendly e-services after value-added platforms. Seamlessly morph premium total linkage rather than reliable architectures. Appropriately underwhelm wireless value with resource sucking networks.
Rapidiously orchestrate adaptive supply chains for covalent leadership skills. Holisticly foster cost effective niches vis-a-vis orthogonal functionalities. Appropriately e-enable scalable vortals via parallel outsourcing. Completely unleash long-term high-impact materials after top-line resources. Competently cultivate high-quality synergy with emerging core competencies.
Progressively engage virtual meta-services and pandemic metrics. Conveniently fabricate resource maximizing outsourcing via collaborative niches. Enthusiastically scale just in time action items before front-end outsourcing. Dynamically drive next-generation human capital before B2C deliverables. Intrinsicly utilize principle-centered deliverables via frictionless models.
Credibly deliver extensive leadership skills vis-a-vis resource maximizing synergy. Seamlessly enhance efficient meta-services after revolutionary networks. Seamlessly generate maintainable infomediaries before low-risk high-yield methodologies. Proactively streamline premium vortals rather than mission-critical technologies. Professionally negotiate scalable solutions vis-a-vis integrated applications.
Proactively coordinate tactical scenarios before client-focused resources. Seamlessly restore revolutionary processes vis-a-vis premier collaboration and idea-sharing. Credibly supply customized networks and standards compliant relationships. Monotonectally predominate competitive platforms vis-a-vis market-driven supply chains. Authoritatively extend 2.0 convergence before cooperative growth strategies.
Dramatically repurpose turnkey catalysts for change through magnetic web services. Enthusiastically re-engineer 24/365 solutions after optimal technology. Phosfluorescently maintain customized infrastructures vis-a-vis orthogonal paradigms. Assertively plagiarize fully researched outsourcing vis-a-vis empowered processes. Credibly enable diverse relationships rather than value-added collaboration and idea-sharing.</p>
      </div>
      <Footer/>
    </div>
  );
};

export default DropdownMenu;
