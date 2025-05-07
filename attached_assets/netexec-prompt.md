# NetExec Tool Educational Platform Development Prompt

## Project Overview
Create a comprehensive web application for educating users about the NetExec tool (formerly CrackMapExec), featuring a command generator and detailed modules documentation. The application should mirror the structure of netexec-tutorial.com while enhancing the user experience with additional resources.

## Core Features

### 1. Home Page
- Introduction to NetExec - what it is, its purpose, and primary use cases
- Quick navigation cards to key sections (Command Generator, Modules, Tutorials)
- Latest NetExec version information and installation guides for various platforms
- Security disclaimer emphasizing ethical use of the tool

### 2. Interactive Command Generator
- Form-based interface allowing users to select:
  - Protocol (SMB, LDAP, MSSQL, WinRM, SSH, etc.)
  - Target specification (IP, range, hostname, file)
  - Authentication methods (username/password, hash, kerberos)
  - Module selection with dynamic parameter fields
  - Command flags and options
- Real-time command preview
- Copy to clipboard functionality
- Save/load command presets
- Basic validation and error checking

### 3. Modules Documentation
- Create a hierarchical navigation structure organized by protocol
- For each module, provide:
  - Description and purpose
  - Required parameters
  - Optional parameters
  - Example usage scenarios
  - Expected output format
  - Common troubleshooting tips
  - Compatibility notes

### 4. Tutorials Section
- Step-by-step guides for common penetration testing scenarios
- Basic to advanced usage patterns
- Integration with other security tools
- Environment setup tutorials
- Video demonstrations embedded from YouTube or self-hosted

### 5. Resources Hub
- Curated list of official documentation
- Community resources and forums
- Related tools and alternatives
- Recommended books and courses
- NetExec GitHub repository integration

## Technical Requirements

### Frontend
- Use React.js for the UI framework
- Implement responsive design with Tailwind CSS
- Create a dark/light theme toggle
- Use syntax highlighting for command examples
- Implement search functionality across all content
- Ensure accessibility compliance

### Backend (Optional - if needed)
- Use Node.js with Express for API endpoints
- Implement caching for performance
- Consider serverless functions for command generation logic

### Data Structure
- Create a comprehensive JSON schema for all NetExec modules, parameters, and protocols
- Develop content in Markdown for easy maintenance
- Structure tutorial content with metadata for filtering and search

### Deployment
- Configure for deployment on Cloudflare Pages
- Set up GitHub Actions for CI/CD
- Implement caching and optimization for fast global access
- Configure proper CORS headers and security settings

## Content Generation Instructions

### 1. Module Documentation
For each protocol (SMB, LDAP, MSSQL, WinRM, SSH, etc.), create a complete list of modules by:
- Researching the current NetExec GitHub repository
- Documenting each module's parameters, options, and use cases
- Providing concrete examples with expected outputs
- Including screenshots where appropriate
- Adding security considerations and ethical usage notes

### 2. Tutorial Content
Create a minimum of 5 tutorials for each of these categories:
- Beginner: Basic usage and setup
- Intermediate: Common penetration testing scenarios
- Advanced: Complex attack simulations and defensive measures
- Integration: Using NetExec with other security tools
- Specialized: Protocol-specific advanced techniques

### 3. Command Generator Logic
Develop the command generator to:
- Include all possible parameters for each module
- Provide intelligent defaults where appropriate
- Include parameter validation rules
- Generate properly formatted commands
- Support command history and favorites

### 4. Resources
- Curate links to official documentation
- Find relevant YouTube tutorials and embed them
- Link to related GitHub repositories
- Create a glossary of related terms and concepts

## SEO Optimization
- Research and implement relevant keywords for penetration testing tools
- Create descriptive meta tags for all pages
- Implement proper heading structure and semantic HTML
- Set up proper canonical URLs
- Implement structured data for better search results

## Performance Optimization
- Lazy load components and images
- Implement code splitting
- Minimize JavaScript and CSS
- Optimize images and assets
- Configure proper caching headers for Cloudflare

## Ethical Considerations
- Include clear disclaimers about legal and ethical use
- Emphasize educational purposes only
- Include references to responsible disclosure practices
- Add warnings about potential system impacts

## Design Guidelines
- Use a clean, technical aesthetic
- Implement a terminal-inspired theme option
- Create custom icons for different modules and protocols
- Use consistent color coding for different protocols
- Design a recognizable logo for the platform

## Development Process
1. Set up the project structure in Replit
2. Create data models for modules and protocols
3. Develop the command generator UI
4. Implement the documentation browser
5. Create the tutorial system
6. Integrate all components
7. Test functionality and responsiveness
8. Optimize for Cloudflare Pages deployment
9. Implement analytics and tracking
10. Launch and share with the security community
