export const portfolioData = {
    "personal": {
        "name": "Daniil Svirenko",
        "role": "Computer Science Student | Java Backend & REST API Developer",
        "location": "Vienna, Austria",
        "contact": "danysvirenko@gmail.com | +43 677 6438 7551",
        "work_permit": "Ukraine (Free access to the Austrian labor market)",
        "linkedin": "https://www.linkedin.com/in/daniil-svirenko-554132273/",
        "github": "https://github.com/Daniilsvirenko"
    },
    "about": {
        "summary": "Dedicated Computer Science student at FH Campus Wien with a strong focus on Backend Engineering, REST API Design, and IT Security. Experienced in transforming monolithic applications into stateless APIs, automating database migrations with Flyway, and securing endpoints with Spring Security. Proven ability to deliver containerized solutions using Docker. Analytical thinker fluent in German (C1) and English (C1). Recently achieved perfect grades (Excellent/1) in advanced courses including DevOps, IT Security Fundamentals, and AI."
    },
    "experience": [
        {
            "title": "Working Student IT Operational Excellence",
            "company": "Raiffeisen Bank International (RBI)",
            "location": "Vienna",
            "duration": "05.2025 - Present",
            "tasks": [
                "Development and maintenance of automated Power BI dashboards for monitoring incident trends and SLAs.",
                "Analysis of operational bottlenecks and derivation of data-driven optimization measures."
            ]
        },
        {
            "title": "Workplace & Front Desk Associate",
            "company": "Bitpanda",
            "location": "Vienna",
            "duration": "06.2024 - 05.2025",
            "tasks": [
                "Responsible for first-level support and triage of technical issues to the IT support team.",
                "Assisting in the coordination of internal processes in a dynamic FinTech environment."
            ]
        }
    ],
    "education": {
        "degree": "B.Sc. Computer Science and Digital Communications",
        "university": "FH Campus Wien | Austria",
        "duration": "09.2024 - Present",
        "core_subjects": "Software Engineering, Backend Development, Network Security, Distributed Systems.",
        "academic_highlights": "Perfect grades (1.0) in DevOps, Internet of Things, Introduction to AI and Data Science, and IT Security Fundamentals (WS2025/26)."
    },
    "projects": [
        {
            "name": "Secure E-Commerce REST API",
            "stack": ["Java 21", "Spring Boot 3", "Spring Security", "Flyway", "PostgreSQL", "Docker", "Maven"],
            "description": "Designed and implemented a pure RESTful API with full CRUD operations, adhering to stateless principles. Transitioned from Form Login to HTTP Basic Auth and configured Role-Based Access Control (RBAC) to protect administrative endpoints. Integrated Flyway for version-controlled database schema evolution and orchestrated the PostgreSQL database using Docker Compose."
        },
        {
            "name": "Telegram Memorial Service Bot",
            "stack": ["Python (AsyncIO)", "Aiogram", "PostgreSQL", "Docker", "SQLAlchemy"],
            "description": "Developed a fully asynchronous bot handling complex user state machines and payment processing. Engineered a non-blocking database layer using SQLAlchemy (Async) and PostgreSQL."
        },
        {
            "name": "Task Management System (Fullstack)",
            "stack": ["Java 21", "Spring MVC", "Thymeleaf", "Bootstrap 5", "H2", "PostgreSQL"],
            "description": "Built a classic MVC application demonstrating clear separation of concerns (Entity-Repository-Service-Controller pattern). Developed a responsive UI using Server-Side Rendering (Thymeleaf) and Bootstrap 5. Managed full application lifecycle including dependency injection and exception handling."
        }
    ],
    "skills": {
        "java_ecosystem": ["Java 21", "Spring Boot 3", "REST APIs", "Spring Security", "Spring Data JPA", "Flyway", "Maven"],
        "devops": ["Docker", "Docker Compose", "GitLab CI", "Linux", "Bash"],
        "databases_and_other": ["PostgreSQL", "Python (Async)", "Git", "Unit Testing (JUnit 5)"],
        "languages": ["German (C1 Professional)", "English (C1 Professional)", "Russian/Ukrainian (Native)"]
    }
};
