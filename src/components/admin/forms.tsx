"use client";

import { CollectionEditor, Field, Grid, ImageField, LineList, Notice, NumberInput, Panel, SaveBar, SelectInput, TextArea, TextInput } from "./formKit";
import { useSectionForm } from "./useSectionForm";
import type { PortfolioContent } from "@/content/types";
import type { EstimatorSection, ProjectsSection, SectionMap } from "@/lib/cms/sections";

const PERSONAL_SEO: Partial<Record<keyof PortfolioContent["personalInfo"], string>> = {
  name: "personalInfo.name",
  title: "personalInfo.title",
  headlinePrefix: "personalInfo.headlinePrefix",
  headlineAccent: "personalInfo.headlineAccent",
  tagline: "personalInfo.tagline",
  email: "personalInfo.email",
  phone: "personalInfo.phone",
  whatsapp: "personalInfo.whatsapp",
  location: "personalInfo.location",
  locationShort: "personalInfo.locationShort",
  yearsExperience: "personalInfo.yearsExperience",
  projectsCompleted: "personalInfo.projectsCompleted",
  conversionGrowth: "personalInfo.conversionGrowth",
  seoGrowth: "personalInfo.seoGrowth",
  profileImageAlt: "personalInfo.profileImageAlt",
  greetingBadgeLocation: "personalInfo.greetingBadgeLocation",
  greetingBadgeText: "personalInfo.greetingBadgeText",
};

function PageIntro({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-black text-slate-900">{title}</h1>
      <p className="mt-1 text-sm text-slate-500">{copy}</p>
    </div>
  );
}

export function SettingsForm({
  initial,
}: {
  initial: Pick<SectionMap, "site" | "personalInfo" | "navigation" | "ctas" | "footer" | "drivingCard" | "cvCompetencies">;
}) {
  const form = useSectionForm(initial, (value) => value);

  return (
    <div className="space-y-5">
      <PageIntro title="Settings" copy="Site metadata, tracking tags, identity, navigation, CTAs, footer, and driving card." />
      <Notice status={form.status} />
      <Panel title="Site metadata">
        <Grid>
          <Field label="Title" seoPath="site.title">
            <TextInput value={form.value.site.title} onChange={(title) => form.setValue({ ...form.value, site: { ...form.value.site, title } })} />
          </Field>
          <Field label="Locale">
            <TextInput value={form.value.site.locale} onChange={(locale) => form.setValue({ ...form.value, site: { ...form.value.site, locale } })} />
          </Field>
          <Field label="Description" seoPath="site.description">
            <TextArea value={form.value.site.description} onChange={(description) => form.setValue({ ...form.value, site: { ...form.value.site, description } })} />
          </Field>
          <Field label="Open Graph title" seoPath="site.ogTitle">
            <TextInput value={form.value.site.ogTitle} onChange={(ogTitle) => form.setValue({ ...form.value, site: { ...form.value.site, ogTitle } })} />
          </Field>
          <Field label="Open Graph description" seoPath="site.ogDescription">
            <TextArea value={form.value.site.ogDescription} onChange={(ogDescription) => form.setValue({ ...form.value, site: { ...form.value.site, ogDescription } })} />
          </Field>
          <Field label="Keywords" seoPath="site.keywords">
            <LineList value={form.value.site.keywords} onChange={(keywords) => form.setValue({ ...form.value, site: { ...form.value.site, keywords } })} />
          </Field>
        </Grid>
      </Panel>

      <Panel title="Tracking and tags">
        <p className="mb-3 text-sm text-slate-500">
          These run on the public site only, not in the CMS. Paste a GA4 Measurement ID for Analytics. Use header/footer for GTM, Meta Pixel, or other embed tags.
        </p>
        <Grid>
          <Field label="GA4 Measurement ID" hint="Example: G-XXXXXXXX. Do not paste the full install script here.">
            <TextInput
              value={form.value.site.ga4MeasurementId ?? ""}
              onChange={(ga4MeasurementId) => form.setValue({ ...form.value, site: { ...form.value.site, ga4MeasurementId } })}
              placeholder="G-XXXXXXXX"
            />
          </Field>
          <Field label="Header tags" hint="HTML for the document head: GTM script, verification tags, extra meta or link tags.">
            <TextArea
              value={form.value.site.headerHtml ?? ""}
              onChange={(headerHtml) => form.setValue({ ...form.value, site: { ...form.value.site, headerHtml } })}
              rows={6}
            />
          </Field>
          <Field label="Footer tags" hint="HTML before the closing body tag, such as a GTM noscript snippet.">
            <TextArea
              value={form.value.site.footerHtml ?? ""}
              onChange={(footerHtml) => form.setValue({ ...form.value, site: { ...form.value.site, footerHtml } })}
              rows={6}
            />
          </Field>
        </Grid>
      </Panel>

      <Panel title="Personal info">
        <Grid>
          {(
            [
              ["name", "Name"],
              ["initials", "Initials"],
              ["title", "Title"],
              ["headlinePrefix", "Headline prefix"],
              ["headlineAccent", "Headline accent"],
              ["navbarSubtitle", "Navbar subtitle"],
              ["cvModalTitle", "CV modal title"],
              ["cvModalSubtitle", "CV modal subtitle"],
              ["tagline", "Tagline"],
              ["email", "Email"],
              ["phone", "Phone"],
              ["whatsapp", "WhatsApp"],
              ["location", "Location"],
              ["locationShort", "Location short"],
              ["dob", "Date of birth"],
              ["drivingLicense", "Driving license"],
              ["drivingLicenseShort", "Driving license short"],
              ["yearsExperience", "Years experience"],
              ["projectsCompleted", "Projects completed"],
              ["conversionGrowth", "Conversion growth"],
              ["seoGrowth", "SEO growth"],
              ["profileImageAlt", "Profile image alt"],
              ["greetingBadgeLocation", "Greeting location"],
              ["greetingBadgeText", "Greeting text"],
            ] as const
          ).map(([key, label]) => (
            <Field key={key} label={label} seoPath={PERSONAL_SEO[key]}>
              <TextInput
                value={form.value.personalInfo[key]}
                onChange={(next) => form.setValue({ ...form.value, personalInfo: { ...form.value.personalInfo, [key]: next } })}
              />
            </Field>
          ))}
          <Field label="Bio" seoPath="personalInfo.bio">
            <TextArea value={form.value.personalInfo.bio} onChange={(bio) => form.setValue({ ...form.value, personalInfo: { ...form.value.personalInfo, bio } })} />
          </Field>
          <Field label="Footer bio" seoPath="personalInfo.footerBio">
            <TextArea value={form.value.personalInfo.footerBio} onChange={(footerBio) => form.setValue({ ...form.value, personalInfo: { ...form.value.personalInfo, footerBio } })} />
          </Field>
          <Field label="Profile image">
            <ImageField value={form.value.personalInfo.profileImage} onChange={(profileImage) => form.setValue({ ...form.value, personalInfo: { ...form.value.personalInfo, profileImage } })} />
          </Field>
          <Field label="WhatsApp link">
            <TextInput value={form.value.personalInfo.socialLinks.whatsapp} onChange={(whatsapp) => form.setValue({ ...form.value, personalInfo: { ...form.value.personalInfo, socialLinks: { ...form.value.personalInfo.socialLinks, whatsapp } } })} />
          </Field>
          <Field label="Email link">
            <TextInput value={form.value.personalInfo.socialLinks.email} onChange={(email) => form.setValue({ ...form.value, personalInfo: { ...form.value.personalInfo, socialLinks: { ...form.value.personalInfo.socialLinks, email } } })} />
          </Field>
          <Field label="LinkedIn" seoPath="personalInfo.socialLinks.linkedin">
            <TextInput value={form.value.personalInfo.socialLinks.linkedin} onChange={(linkedin) => form.setValue({ ...form.value, personalInfo: { ...form.value.personalInfo, socialLinks: { ...form.value.personalInfo.socialLinks, linkedin } } })} />
          </Field>
          <Field label="GitHub" seoPath="personalInfo.socialLinks.github">
            <TextInput value={form.value.personalInfo.socialLinks.github} onChange={(github) => form.setValue({ ...form.value, personalInfo: { ...form.value.personalInfo, socialLinks: { ...form.value.personalInfo.socialLinks, github } } })} />
          </Field>
        </Grid>
      </Panel>

      <Panel title="Navigation">
        <CollectionEditor
          title="Nav items"
          items={form.value.navigation}
          onChange={(navigation) => form.setValue({ ...form.value, navigation })}
          createItem={() => ({ name: "NEW", href: "#", id: `nav-${Date.now()}` })}
          renderItem={(item, _index, update) => (
            <Grid>
              <Field label="Label"><TextInput value={item.name} onChange={(name) => update({ ...item, name })} /></Field>
              <Field label="Href"><TextInput value={item.href} onChange={(href) => update({ ...item, href })} /></Field>
              <Field label="ID"><TextInput value={item.id} onChange={(id) => update({ ...item, id })} /></Field>
            </Grid>
          )}
        />
      </Panel>

      <Panel title="Button labels">
        <Grid>
          {(Object.keys(form.value.ctas) as Array<keyof typeof form.value.ctas>).map((key) => (
            <Field key={key} label={key}>
              <TextInput value={form.value.ctas[key]} onChange={(next) => form.setValue({ ...form.value, ctas: { ...form.value.ctas, [key]: next } })} />
            </Field>
          ))}
        </Grid>
      </Panel>

      <Panel title="Footer">
        <Grid>
          <Field label="Newsletter heading"><TextInput value={form.value.footer.newsletterHeading} onChange={(newsletterHeading) => form.setValue({ ...form.value, footer: { ...form.value.footer, newsletterHeading } })} /></Field>
          <Field label="Copyright suffix"><TextInput value={form.value.footer.copyrightSuffix} onChange={(copyrightSuffix) => form.setValue({ ...form.value, footer: { ...form.value.footer, copyrightSuffix } })} /></Field>
          <Field label="Designed with"><TextInput value={form.value.footer.designedWith} onChange={(designedWith) => form.setValue({ ...form.value, footer: { ...form.value.footer, designedWith } })} /></Field>
          <Field label="Newsletter copy"><TextArea value={form.value.footer.newsletterCopy} onChange={(newsletterCopy) => form.setValue({ ...form.value, footer: { ...form.value.footer, newsletterCopy } })} /></Field>
        </Grid>
      </Panel>

      <Panel title="Driving card">
        <Grid>
          {(Object.keys(form.value.drivingCard) as Array<keyof typeof form.value.drivingCard>).map((key) => (
            <Field key={key} label={key}>
              <TextInput value={form.value.drivingCard[key]} onChange={(next) => form.setValue({ ...form.value, drivingCard: { ...form.value.drivingCard, [key]: next } })} />
            </Field>
          ))}
        </Grid>
      </Panel>

      <Panel title="CV competencies">
        <CollectionEditor
          title="Blocks"
          items={form.value.cvCompetencies}
          onChange={(cvCompetencies) => form.setValue({ ...form.value, cvCompetencies })}
          createItem={() => ({ title: "New competency", body: "", tone: "neutral" as const })}
          renderItem={(item, _index, update) => (
            <Grid>
              <Field label="Title"><TextInput value={item.title} onChange={(title) => update({ ...item, title })} /></Field>
              <Field label="Tone">
                <SelectInput value={item.tone} onChange={(tone) => update({ ...item, tone: tone as "neutral" | "accent" })} options={[{ value: "neutral", label: "Neutral" }, { value: "accent", label: "Accent" }]} />
              </Field>
              <Field label="Body"><TextArea value={item.body} onChange={(body) => update({ ...item, body })} /></Field>
            </Grid>
          )}
        />
      </Panel>
      <SaveBar saving={form.saving} onSave={() => void form.save()} />
    </div>
  );
}

export function HeroForm({ initial }: { initial: PortfolioContent["hero"] }) {
  const form = useSectionForm(initial, (hero) => ({ hero }));

  return (
    <div className="space-y-5">
      <PageIntro title="Hero" copy="Each field now has a role bar under it: H1/H2/meta vs UI-only, plus SEO / AEO / GEO. The homepage H1 is Settings → Name, not these hero chrome labels." />
      <Notice status={form.status} />
      <Panel title="Hanging card labels">
        <Grid>
          <Field label="Vibe engine" seoPath="hero.hangingCards.vibeEngine"><TextInput value={form.value.hangingCards.vibeEngine} onChange={(vibeEngine) => form.setValue({ ...form.value, hangingCards: { ...form.value.hangingCards, vibeEngine } })} /></Field>
          <Field label="Core Web Vitals" seoPath="hero.hangingCards.coreWebVitals"><TextInput value={form.value.hangingCards.coreWebVitals} onChange={(coreWebVitals) => form.setValue({ ...form.value, hangingCards: { ...form.value.hangingCards, coreWebVitals } })} /></Field>
          <Field label="Stack" seoPath="hero.hangingCards.stack"><TextInput value={form.value.hangingCards.stack} onChange={(stack) => form.setValue({ ...form.value, hangingCards: { ...form.value.hangingCards, stack } })} /></Field>
        </Grid>
      </Panel>
      <Panel title="Speed dial">
        <Grid>
          <Field label="PageSpeed label" seoPath="hero.speedDial.pagespeedLabel"><TextInput value={form.value.speedDial.pagespeedLabel} onChange={(pagespeedLabel) => form.setValue({ ...form.value, speedDial: { ...form.value.speedDial, pagespeedLabel } })} /></Field>
          <Field label="PageSpeed score"><NumberInput value={form.value.speedDial.pagespeedScore} onChange={(pagespeedScore) => form.setValue({ ...form.value, speedDial: { ...form.value.speedDial, pagespeedScore } })} /></Field>
          <Field label="LCP" seoPath="hero.speedDial.lcp"><TextInput value={form.value.speedDial.lcp} onChange={(lcp) => form.setValue({ ...form.value, speedDial: { ...form.value.speedDial, lcp } })} /></Field>
          <Field label="CRO lift"><TextInput value={form.value.speedDial.croLift} onChange={(croLift) => form.setValue({ ...form.value, speedDial: { ...form.value.speedDial, croLift } })} /></Field>
          <Field label="CRO caption"><TextInput value={form.value.speedDial.croCaption} onChange={(croCaption) => form.setValue({ ...form.value, speedDial: { ...form.value.speedDial, croCaption } })} /></Field>
          <Field label="Vitals label"><TextInput value={form.value.speedDial.vitalsLabel} onChange={(vitalsLabel) => form.setValue({ ...form.value, speedDial: { ...form.value.speedDial, vitalsLabel } })} /></Field>
          <Field label="Vitals value"><TextInput value={form.value.speedDial.vitalsValue} onChange={(vitalsValue) => form.setValue({ ...form.value, speedDial: { ...form.value.speedDial, vitalsValue } })} /></Field>
          <Field label="SEO label" seoPath="hero.speedDial.seoLabel"><TextInput value={form.value.speedDial.seoLabel} onChange={(seoLabel) => form.setValue({ ...form.value, speedDial: { ...form.value.speedDial, seoLabel } })} /></Field>
          <Field label="SEO value" seoPath="hero.speedDial.seoValue"><TextInput value={form.value.speedDial.seoValue} onChange={(seoValue) => form.setValue({ ...form.value, speedDial: { ...form.value.speedDial, seoValue } })} /></Field>
        </Grid>
      </Panel>
      <Panel title="Hero stats">
        <CollectionEditor
          title="Metrics"
          items={form.value.stats}
          onChange={(stats) => form.setValue({ ...form.value, stats })}
          createItem={() => ({
            id: `stat-${Date.now()}`,
            value: "0",
            label: "New stat",
            shortLabel: "Stat",
            category: "Career",
            description: "",
            detailTitle: "",
            detailBody: "",
            icon: "Award" as const,
            accentClass: "text-purple-600",
          })}
          renderItem={(item, _index, update) => (
            <Grid>
              <Field label="ID"><TextInput value={item.id} onChange={(id) => update({ ...item, id })} /></Field>
              <Field label="Value" seoPath="hero.stats.value"><TextInput value={item.value} onChange={(value) => update({ ...item, value })} /></Field>
              <Field label="Label" seoPath="hero.stats.label"><TextInput value={item.label} onChange={(label) => update({ ...item, label })} /></Field>
              <Field label="Short label"><TextInput value={item.shortLabel} onChange={(shortLabel) => update({ ...item, shortLabel })} /></Field>
              <Field label="Category"><TextInput value={item.category} onChange={(category) => update({ ...item, category })} /></Field>
              <Field label="Icon">
                <SelectInput value={item.icon} onChange={(icon) => update({ ...item, icon: icon as typeof item.icon })} options={[{ value: "Award", label: "Award" }, { value: "TrendingUp", label: "TrendingUp" }, { value: "Zap", label: "Zap" }]} />
              </Field>
              <Field label="Accent class"><TextInput value={item.accentClass} onChange={(accentClass) => update({ ...item, accentClass })} /></Field>
              <Field label="Description" seoPath="hero.stats.description"><TextInput value={item.description} onChange={(description) => update({ ...item, description })} /></Field>
              <Field label="Detail title"><TextInput value={item.detailTitle} onChange={(detailTitle) => update({ ...item, detailTitle })} /></Field>
              <Field label="Detail body"><TextArea value={item.detailBody} onChange={(detailBody) => update({ ...item, detailBody })} /></Field>
            </Grid>
          )}
        />
      </Panel>
      <Panel title="Vibe presets">
        <CollectionEditor
          title="Presets"
          items={form.value.vibePresets}
          onChange={(vibePresets) => form.setValue({ ...form.value, vibePresets })}
          createItem={() => ({ id: `preset-${Date.now()}`, title: "New preset", tool: "", tag: "", prompt: "", codeSnippet: "", resultMetric: "" })}
          renderItem={(item, _index, update) => (
            <Grid>
              {(["id", "title", "tool", "tag", "resultMetric", "prompt", "codeSnippet"] as const).map((key) => (
                <Field key={key} label={key}>
                  {key === "prompt" || key === "codeSnippet" ? (
                    <TextArea value={item[key]} onChange={(next) => update({ ...item, [key]: next })} />
                  ) : (
                    <TextInput value={item[key]} onChange={(next) => update({ ...item, [key]: next })} />
                  )}
                </Field>
              ))}
            </Grid>
          )}
        />
      </Panel>
      <Panel title="Stack items">
        <CollectionEditor
          title="Tools"
          items={form.value.stackItems}
          onChange={(stackItems) => form.setValue({ ...form.value, stackItems })}
          createItem={() => ({ name: "New tool", category: "", highlight: "", color: "bg-purple-100 text-purple-800" })}
          renderItem={(item, _index, update) => (
            <Grid>
              <Field label="Name"><TextInput value={item.name} onChange={(name) => update({ ...item, name })} /></Field>
              <Field label="Category"><TextInput value={item.category} onChange={(category) => update({ ...item, category })} /></Field>
              <Field label="Highlight"><TextInput value={item.highlight} onChange={(highlight) => update({ ...item, highlight })} /></Field>
              <Field label="Color classes"><TextInput value={item.color} onChange={(color) => update({ ...item, color })} /></Field>
            </Grid>
          )}
        />
      </Panel>
      <SaveBar saving={form.saving} onSave={() => void form.save()} />
    </div>
  );
}

export function ServicesForm({
  initial,
}: {
  initial: { services: PortfolioContent["services"]; estimator: EstimatorSection; sections: PortfolioContent["sections"] };
}) {
  const form = useSectionForm(initial, (value) => ({
    services: value.services,
    estimator: value.estimator,
    sections: value.sections,
  }));

  return (
    <div className="space-y-5">
      <PageIntro title="Services" copy="Role bars sit under each field. Section Heading is H2. Service Title is H3. Colors and IDs are UI only." />
      <Notice status={form.status} />
      <SectionCopyFields
        value={form.value.sections.services}
        onChange={(services) => form.setValue({ ...form.value, sections: { ...form.value.sections, services } })}
      />
      <Panel title="Services">
        <CollectionEditor
          title="Service cards"
          items={form.value.services}
          onChange={(services) => form.setValue({ ...form.value, services })}
          createItem={() => ({
            id: `service-${Date.now()}`,
            number: "0",
            icon: "Layout",
            title: "New service",
            shortDesc: "",
            description: "",
            features: [],
            color: "from-purple-500/10 to-indigo-500/10",
            accent: "#7C5CFC",
          })}
          renderItem={(item, _index, update) => (
            <Grid>
              <Field label="ID"><TextInput value={item.id} onChange={(id) => update({ ...item, id })} /></Field>
              <Field label="Number"><TextInput value={item.number} onChange={(number) => update({ ...item, number })} /></Field>
              <Field label="Icon"><TextInput value={item.icon} onChange={(icon) => update({ ...item, icon })} /></Field>
              <Field label="Title" seoPath="services.title"><TextInput value={item.title} onChange={(title) => update({ ...item, title })} /></Field>
              <Field label="Short description" seoPath="services.shortDesc"><TextArea value={item.shortDesc} onChange={(shortDesc) => update({ ...item, shortDesc })} /></Field>
              <Field label="Description" seoPath="services.description"><TextArea value={item.description} onChange={(description) => update({ ...item, description })} /></Field>
              <Field label="Color"><TextInput value={item.color} onChange={(color) => update({ ...item, color })} /></Field>
              <Field label="Accent"><TextInput value={item.accent} onChange={(accent) => update({ ...item, accent })} /></Field>
              <Field label="Features" seoPath="services.features"><LineList value={item.features} onChange={(features) => update({ ...item, features })} /></Field>
            </Grid>
          )}
        />
      </Panel>
      <Panel title="Estimator">
        <Field label="Default option IDs">
          <LineList value={form.value.estimator.defaults} onChange={(defaults) => form.setValue({ ...form.value, estimator: { ...form.value.estimator, defaults } })} />
        </Field>
        <CollectionEditor
          title="Options"
          items={form.value.estimator.options}
          onChange={(options) => form.setValue({ ...form.value, estimator: { ...form.value.estimator, options } })}
          createItem={() => ({ id: `opt-${Date.now()}`, name: "New option", category: "Design", days: 2, badge: "" })}
          renderItem={(item, _index, update) => (
            <Grid>
              <Field label="ID"><TextInput value={item.id} onChange={(id) => update({ ...item, id })} /></Field>
              <Field label="Name"><TextInput value={item.name} onChange={(name) => update({ ...item, name })} /></Field>
              <Field label="Category"><TextInput value={item.category} onChange={(category) => update({ ...item, category })} /></Field>
              <Field label="Days"><NumberInput value={item.days} onChange={(days) => update({ ...item, days })} /></Field>
              <Field label="Badge"><TextInput value={item.badge} onChange={(badge) => update({ ...item, badge })} /></Field>
            </Grid>
          )}
        />
      </Panel>
      <SaveBar saving={form.saving} onSave={() => void form.save()} />
    </div>
  );
}

function SectionCopyFields({
  value,
  onChange,
}: {
  value: PortfolioContent["sections"]["services"];
  onChange: (value: PortfolioContent["sections"]["services"]) => void;
}) {
  return (
    <Panel title="Section heading">
      <Grid>
        <Field label="Badge" seoPath="sections.badge"><TextInput value={value.badge} onChange={(badge) => onChange({ ...value, badge })} /></Field>
        <Field label="Heading" seoPath="sections.heading"><TextInput value={value.heading} onChange={(heading) => onChange({ ...value, heading })} /></Field>
        <Field label="Description" seoPath="sections.description"><TextArea value={value.description} onChange={(description) => onChange({ ...value, description })} /></Field>
      </Grid>
    </Panel>
  );
}

export function ProjectsForm({
  initial,
}: {
  initial: { projects: ProjectsSection; sections: PortfolioContent["sections"] };
}) {
  const form = useSectionForm(initial, (value) => ({ projects: value.projects, sections: value.sections }));

  return (
    <div className="space-y-5">
      <PageIntro title="Projects" copy="Project cards, case studies, images, and category filters." />
      <Notice status={form.status} />
      <SectionCopyFields value={form.value.sections.projects} onChange={(projects) => form.setValue({ ...form.value, sections: { ...form.value.sections, projects } })} />
      <Panel title="Categories">
        <LineList value={form.value.projects.categories} onChange={(categories) => form.setValue({ ...form.value, projects: { ...form.value.projects, categories } })} />
      </Panel>
      <Panel title="Projects">
        <CollectionEditor
          title="Case studies"
          items={form.value.projects.items}
          onChange={(items) => form.setValue({ ...form.value, projects: { ...form.value.projects, items } })}
          createItem={() => ({
            id: `project-${Date.now()}`,
            title: "New project",
            category: form.value.projects.categories[0] ?? "Projects",
            subtitle: "",
            description: "",
            fullCaseStudy: { client: "", role: "", timeline: "", challenge: "", solution: "", keyAchievements: [], architecture: [] },
            metrics: [],
            tags: [],
            liveUrl: "https://",
            image: "",
            badge: "",
            previewGradient: "from-purple-900/90 via-indigo-950/90 to-slate-900/95",
          })}
          renderItem={(item, _index, update) => (
            <div className="space-y-3">
              <Grid>
                <Field label="ID"><TextInput value={item.id} onChange={(id) => update({ ...item, id })} /></Field>
                <Field label="Title" seoPath="projects.title"><TextInput value={item.title} onChange={(title) => update({ ...item, title })} /></Field>
                <Field label="Category"><TextInput value={item.category} onChange={(category) => update({ ...item, category })} /></Field>
                <Field label="Subtitle" seoPath="projects.subtitle"><TextInput value={item.subtitle} onChange={(subtitle) => update({ ...item, subtitle })} /></Field>
                <Field label="Live URL" seoPath="projects.liveUrl"><TextInput value={item.liveUrl} onChange={(liveUrl) => update({ ...item, liveUrl })} /></Field>
                <Field label="Badge"><TextInput value={item.badge ?? ""} onChange={(badge) => update({ ...item, badge })} /></Field>
                <Field label="Preview gradient"><TextInput value={item.previewGradient} onChange={(previewGradient) => update({ ...item, previewGradient })} /></Field>
                <Field label="Description" seoPath="projects.description"><TextArea value={item.description} onChange={(description) => update({ ...item, description })} /></Field>
                <Field label="Image" seoPath="projects.image"><ImageField value={item.image} onChange={(image) => update({ ...item, image })} /></Field>
                <Field label="Tags"><LineList value={item.tags} onChange={(tags) => update({ ...item, tags })} /></Field>
              </Grid>
              <Grid>
                <Field label="Client"><TextInput value={item.fullCaseStudy.client} onChange={(client) => update({ ...item, fullCaseStudy: { ...item.fullCaseStudy, client } })} /></Field>
                <Field label="Role"><TextInput value={item.fullCaseStudy.role} onChange={(role) => update({ ...item, fullCaseStudy: { ...item.fullCaseStudy, role } })} /></Field>
                <Field label="Timeline"><TextInput value={item.fullCaseStudy.timeline} onChange={(timeline) => update({ ...item, fullCaseStudy: { ...item.fullCaseStudy, timeline } })} /></Field>
                <Field label="Challenge" seoPath="projects.challenge"><TextArea value={item.fullCaseStudy.challenge} onChange={(challenge) => update({ ...item, fullCaseStudy: { ...item.fullCaseStudy, challenge } })} /></Field>
                <Field label="Solution" seoPath="projects.solution"><TextArea value={item.fullCaseStudy.solution} onChange={(solution) => update({ ...item, fullCaseStudy: { ...item.fullCaseStudy, solution } })} /></Field>
                <Field label="Achievements" seoPath="projects.achievements"><LineList value={item.fullCaseStudy.keyAchievements} onChange={(keyAchievements) => update({ ...item, fullCaseStudy: { ...item.fullCaseStudy, keyAchievements } })} /></Field>
                <Field label="Architecture" seoPath="projects.architecture"><LineList value={item.fullCaseStudy.architecture} onChange={(architecture) => update({ ...item, fullCaseStudy: { ...item.fullCaseStudy, architecture } })} /></Field>
              </Grid>
              <CollectionEditor
                title="Metrics"
                items={item.metrics}
                onChange={(metrics) => update({ ...item, metrics })}
                createItem={() => ({ label: "Metric", value: "0" })}
                renderItem={(metric, _metricIndex, updateMetric) => (
                  <Grid>
                    <Field label="Label"><TextInput value={metric.label} onChange={(label) => updateMetric({ ...metric, label })} /></Field>
                    <Field label="Value" seoPath="projects.metrics"><TextInput value={metric.value} onChange={(value) => updateMetric({ ...metric, value })} /></Field>
                  </Grid>
                )}
              />
            </div>
          )}
        />
      </Panel>
      <SaveBar saving={form.saving} onSave={() => void form.save()} />
    </div>
  );
}

export function SkillsForm({
  initial,
}: {
  initial: { skills: PortfolioContent["skills"]; sections: PortfolioContent["sections"] };
}) {
  const form = useSectionForm(initial, (value) => ({ skills: value.skills, sections: value.sections }));

  return (
    <div className="space-y-5">
      <PageIntro title="Skills" copy="Proficiency meters, tools, and filter categories." />
      <Notice status={form.status} />
      <SectionCopyFields value={form.value.sections.skills} onChange={(skills) => form.setValue({ ...form.value, sections: { ...form.value.sections, skills } })} />
      <Panel title="Categories">
        <Field label="Tool categories"><LineList value={form.value.skills.toolCategories} onChange={(toolCategories) => form.setValue({ ...form.value, skills: { ...form.value.skills, toolCategories } })} /></Field>
        <Field label="Specialized tags"><LineList value={form.value.skills.specializedTags} onChange={(specializedTags) => form.setValue({ ...form.value, skills: { ...form.value.skills, specializedTags } })} /></Field>
      </Panel>
      <Panel title="Proficiency meters">
        <CollectionEditor
          title="Meters"
          items={form.value.skills.progressMeters}
          onChange={(progressMeters) => form.setValue({ ...form.value, skills: { ...form.value.skills, progressMeters } })}
          createItem={() => ({ name: "New skill", level: 80, category: "Frontend" })}
          renderItem={(item, _index, update) => (
            <Grid>
              <Field label="Name" seoPath="skills.name"><TextInput value={item.name} onChange={(name) => update({ ...item, name })} /></Field>
              <Field label="Category"><TextInput value={item.category} onChange={(category) => update({ ...item, category })} /></Field>
              <Field label="Level"><NumberInput value={item.level} onChange={(level) => update({ ...item, level })} /></Field>
            </Grid>
          )}
        />
      </Panel>
      <Panel title="Tools">
        <CollectionEditor
          title="Tool cards"
          items={form.value.skills.tools}
          onChange={(tools) => form.setValue({ ...form.value, skills: { ...form.value.skills, tools } })}
          createItem={() => ({ name: "New tool", category: "Frontend", icon: "Code", color: "text-purple-600", usage: "", impact: "" })}
          renderItem={(item, _index, update) => (
            <Grid>
              {(["name", "category", "icon", "color", "usage", "impact"] as const).map((key) => (
                <Field key={key} label={key}>
                  {key === "usage" || key === "impact" ? (
                    <TextArea value={item[key]} onChange={(next) => update({ ...item, [key]: next })} />
                  ) : (
                    <TextInput value={item[key]} onChange={(next) => update({ ...item, [key]: next })} />
                  )}
                </Field>
              ))}
            </Grid>
          )}
        />
      </Panel>
      <SaveBar saving={form.saving} onSave={() => void form.save()} />
    </div>
  );
}

export function ProcessForm({
  initial,
}: {
  initial: { processSteps: PortfolioContent["processSteps"]; sections: PortfolioContent["sections"] };
}) {
  const form = useSectionForm(initial, (value) => ({ processSteps: value.processSteps, sections: value.sections }));

  return (
    <div className="space-y-5">
      <PageIntro title="Process" copy="Step-by-step delivery pipeline." />
      <Notice status={form.status} />
      <SectionCopyFields value={form.value.sections.process} onChange={(process) => form.setValue({ ...form.value, sections: { ...form.value.sections, process } })} />
      <Panel title="Steps">
        <CollectionEditor
          title="Process steps"
          items={form.value.processSteps}
          onChange={(processSteps) => form.setValue({ ...form.value, processSteps })}
          createItem={() => ({
            step: "0",
            title: "New step",
            tagline: "",
            desc: "",
            icon: "Search",
            color: "text-purple-600",
            accentBg: "bg-purple-50",
            borderColor: "border-purple-200",
            deliverables: [],
            toolsUsed: [],
            duration: "",
            keyMetric: "",
            codeOrArtifact: "",
          })}
          renderItem={(item, _index, update) => (
            <Grid>
              {(["step", "title", "tagline", "icon", "color", "accentBg", "borderColor", "duration", "keyMetric"] as const).map((key) => (
                <Field key={key} label={key} seoPath={key === "title" ? "process.title" : undefined}><TextInput value={item[key]} onChange={(next) => update({ ...item, [key]: next })} /></Field>
              ))}
              <Field label="Description" seoPath="process.desc"><TextArea value={item.desc} onChange={(desc) => update({ ...item, desc })} /></Field>
              <Field label="Code / artifact"><TextArea value={item.codeOrArtifact} onChange={(codeOrArtifact) => update({ ...item, codeOrArtifact })} /></Field>
              <Field label="Deliverables"><LineList value={item.deliverables} onChange={(deliverables) => update({ ...item, deliverables })} /></Field>
              <Field label="Tools used"><LineList value={item.toolsUsed} onChange={(toolsUsed) => update({ ...item, toolsUsed })} /></Field>
            </Grid>
          )}
        />
      </Panel>
      <SaveBar saving={form.saving} onSave={() => void form.save()} />
    </div>
  );
}

export function ExperienceForm({
  initial,
}: {
  initial: { experience: PortfolioContent["experience"]; careerSidebar: PortfolioContent["careerSidebar"]; sections: PortfolioContent["sections"] };
}) {
  const form = useSectionForm(initial, (value) => ({
    experience: value.experience,
    careerSidebar: value.careerSidebar,
    sections: value.sections,
  }));

  return (
    <div className="space-y-5">
      <PageIntro title="Experience" copy="Roles, highlights, and the career sidebar." />
      <Notice status={form.status} />
      <SectionCopyFields value={form.value.sections.experience} onChange={(experience) => form.setValue({ ...form.value, sections: { ...form.value.sections, experience } })} />
      <Panel title="Career sidebar">
        <Grid>
          <Field label="Heading" seoPath="careerSidebar.heading"><TextInput value={form.value.careerSidebar.heading} onChange={(heading) => form.setValue({ ...form.value, careerSidebar: { ...form.value.careerSidebar, heading } })} /></Field>
          <Field label="Period"><TextInput value={form.value.careerSidebar.period} onChange={(period) => form.setValue({ ...form.value, careerSidebar: { ...form.value.careerSidebar, period } })} /></Field>
          <Field label="Blurb" seoPath="careerSidebar.blurb"><TextArea value={form.value.careerSidebar.blurb} onChange={(blurb) => form.setValue({ ...form.value, careerSidebar: { ...form.value.careerSidebar, blurb } })} /></Field>
        </Grid>
        <CollectionEditor
          title="Sidebar stats"
          items={form.value.careerSidebar.stats}
          onChange={(stats) => form.setValue({ ...form.value, careerSidebar: { ...form.value.careerSidebar, stats } })}
          createItem={() => ({ label: "Stat", value: "0", valueClass: "text-[#7C5CFC]" })}
          renderItem={(item, _index, update) => (
            <Grid>
              <Field label="Label"><TextInput value={item.label} onChange={(label) => update({ ...item, label })} /></Field>
              <Field label="Value"><TextInput value={item.value} onChange={(value) => update({ ...item, value })} /></Field>
              <Field label="Value class"><TextInput value={item.valueClass} onChange={(valueClass) => update({ ...item, valueClass })} /></Field>
            </Grid>
          )}
        />
      </Panel>
      <Panel title="Roles">
        <CollectionEditor
          title="Jobs"
          items={form.value.experience}
          onChange={(experience) => form.setValue({ ...form.value, experience })}
          createItem={() => ({
            id: `job-${Date.now()}`,
            title: "New role",
            company: "",
            location: "",
            period: "",
            badge: "",
            summary: "",
            highlights: [],
            metrics: [],
            skillsUsed: [],
          })}
          renderItem={(item, _index, update) => (
            <Grid>
              <Field label="ID"><TextInput value={item.id} onChange={(id) => update({ ...item, id })} /></Field>
              <Field label="Title" seoPath="experience.title"><TextInput value={item.title} onChange={(title) => update({ ...item, title })} /></Field>
              <Field label="Company" seoPath="experience.company"><TextInput value={item.company} onChange={(company) => update({ ...item, company })} /></Field>
              <Field label="Location" seoPath="experience.location"><TextInput value={item.location} onChange={(location) => update({ ...item, location })} /></Field>
              <Field label="Period"><TextInput value={item.period} onChange={(period) => update({ ...item, period })} /></Field>
              <Field label="Badge"><TextInput value={item.badge ?? ""} onChange={(badge) => update({ ...item, badge })} /></Field>
              <Field label="Summary" seoPath="experience.summary"><TextArea value={item.summary} onChange={(summary) => update({ ...item, summary })} /></Field>
              <Field label="Highlights" seoPath="experience.highlights"><LineList value={item.highlights} onChange={(highlights) => update({ ...item, highlights })} /></Field>
              <Field label="Metrics"><LineList value={item.metrics} onChange={(metrics) => update({ ...item, metrics })} /></Field>
              <Field label="Skills"><LineList value={item.skillsUsed} onChange={(skillsUsed) => update({ ...item, skillsUsed })} /></Field>
            </Grid>
          )}
        />
      </Panel>
      <SaveBar saving={form.saving} onSave={() => void form.save()} />
    </div>
  );
}

export function EducationForm({
  initial,
}: {
  initial: {
    education: PortfolioContent["education"];
    certifications: PortfolioContent["certifications"];
    languages: PortfolioContent["languages"];
    sections: PortfolioContent["sections"];
  };
}) {
  const form = useSectionForm(initial, (value) => ({
    education: value.education,
    certifications: value.certifications,
    languages: value.languages,
    sections: value.sections,
  }));

  return (
    <div className="space-y-5">
      <PageIntro title="Education" copy="Degrees, certifications, and languages." />
      <Notice status={form.status} />
      <SectionCopyFields value={form.value.sections.education} onChange={(education) => form.setValue({ ...form.value, sections: { ...form.value.sections, education } })} />
      <Panel title="Degrees">
        <CollectionEditor
          title="Education items"
          items={form.value.education}
          onChange={(education) => form.setValue({ ...form.value, education })}
          createItem={() => ({
            id: `edu-${Date.now()}`,
            degree: "New degree",
            institution: "",
            field: "",
            period: "",
            location: "",
            badge: "",
            categoryLabel: "",
            description: "",
            modules: [],
            modulesLabel: "Modules",
            statusLabel: "",
            icon: "GraduationCap",
            accent: "purple" as const,
          })}
          renderItem={(item, _index, update) => (
            <Grid>
              <Field label="ID"><TextInput value={item.id} onChange={(id) => update({ ...item, id })} /></Field>
              <Field label="Degree" seoPath="education.degree"><TextInput value={item.degree} onChange={(degree) => update({ ...item, degree })} /></Field>
              <Field label="Institution" seoPath="education.institution"><TextInput value={item.institution} onChange={(institution) => update({ ...item, institution })} /></Field>
              <Field label="Field"><TextInput value={item.field} onChange={(field) => update({ ...item, field })} /></Field>
              <Field label="Period"><TextInput value={item.period ?? ""} onChange={(period) => update({ ...item, period })} /></Field>
              <Field label="Location"><TextInput value={item.location} onChange={(location) => update({ ...item, location })} /></Field>
              <Field label="Badge"><TextInput value={item.badge} onChange={(badge) => update({ ...item, badge })} /></Field>
              <Field label="Category label"><TextInput value={item.categoryLabel} onChange={(categoryLabel) => update({ ...item, categoryLabel })} /></Field>
              <Field label="Status"><TextInput value={item.statusLabel} onChange={(statusLabel) => update({ ...item, statusLabel })} /></Field>
              <Field label="Modules label"><TextInput value={item.modulesLabel} onChange={(modulesLabel) => update({ ...item, modulesLabel })} /></Field>
              <Field label="Icon"><TextInput value={item.icon} onChange={(icon) => update({ ...item, icon })} /></Field>
              <Field label="Accent">
                <SelectInput value={item.accent} onChange={(accent) => update({ ...item, accent: accent as typeof item.accent })} options={[{ value: "purple", label: "Purple" }, { value: "indigo", label: "Indigo" }, { value: "slate", label: "Slate" }]} />
              </Field>
              <Field label="Description" seoPath="education.description"><TextArea value={item.description} onChange={(description) => update({ ...item, description })} /></Field>
              <Field label="Modules"><LineList value={item.modules} onChange={(modules) => update({ ...item, modules })} /></Field>
            </Grid>
          )}
        />
      </Panel>
      <Panel title="Certifications">
        <CollectionEditor
          title="Certificates"
          items={form.value.certifications}
          onChange={(certifications) => form.setValue({ ...form.value, certifications })}
          createItem={() => ({
            title: "New certificate",
            issuer: "",
            date: "",
            credentialUrl: "",
            skills: [],
            badge: "",
            description: "",
            competencies: [],
            issuerShort: "",
            accent: "purple" as const,
          })}
          renderItem={(item, _index, update) => (
            <Grid>
              <Field label="Title" seoPath="certifications.title"><TextInput value={item.title} onChange={(title) => update({ ...item, title })} /></Field>
              <Field label="Issuer"><TextInput value={item.issuer} onChange={(issuer) => update({ ...item, issuer })} /></Field>
              <Field label="Issuer short"><TextInput value={item.issuerShort} onChange={(issuerShort) => update({ ...item, issuerShort })} /></Field>
              <Field label="Date"><TextInput value={item.date} onChange={(date) => update({ ...item, date })} /></Field>
              <Field label="Badge"><TextInput value={item.badge} onChange={(badge) => update({ ...item, badge })} /></Field>
              <Field label="Credential URL"><TextInput value={item.credentialUrl ?? ""} onChange={(credentialUrl) => update({ ...item, credentialUrl })} /></Field>
              <Field label="Accent">
                <SelectInput value={item.accent} onChange={(accent) => update({ ...item, accent: accent as typeof item.accent })} options={[{ value: "amber", label: "Amber" }, { value: "purple", label: "Purple" }]} />
              </Field>
              <Field label="Description"><TextArea value={item.description} onChange={(description) => update({ ...item, description })} /></Field>
              <Field label="Skills"><LineList value={item.skills} onChange={(skills) => update({ ...item, skills })} /></Field>
              <Field label="Competencies"><LineList value={item.competencies} onChange={(competencies) => update({ ...item, competencies })} /></Field>
            </Grid>
          )}
        />
      </Panel>
      <Panel title="Languages">
        <CollectionEditor
          title="Languages"
          items={form.value.languages}
          onChange={(languages) => form.setValue({ ...form.value, languages })}
          createItem={() => ({ language: "English", proficiency: "Fluent", description: "" })}
          renderItem={(item, _index, update) => (
            <Grid>
              <Field label="Language" seoPath="languages.language"><TextInput value={item.language} onChange={(language) => update({ ...item, language })} /></Field>
              <Field label="Proficiency"><TextInput value={item.proficiency} onChange={(proficiency) => update({ ...item, proficiency })} /></Field>
              <Field label="Description"><TextArea value={item.description} onChange={(description) => update({ ...item, description })} /></Field>
            </Grid>
          )}
        />
      </Panel>
      <SaveBar saving={form.saving} onSave={() => void form.save()} />
    </div>
  );
}

export function TestimonialsForm({ initial }: { initial: PortfolioContent["testimonials"] }) {
  const form = useSectionForm(initial, (testimonials) => ({ testimonials }));

  return (
    <div className="space-y-5">
      <PageIntro title="Testimonials" copy="Quotes, avatars, and ratings." />
      <Notice status={form.status} />
      <Panel title="Testimonials">
        <CollectionEditor
          title="Quotes"
          items={form.value}
          onChange={form.setValue}
          createItem={() => ({ quote: "", author: "", role: "", avatar: "", company: "", rating: 5 })}
          renderItem={(item, _index, update) => (
            <Grid>
              <Field label="Author" seoPath="testimonials.author"><TextInput value={item.author} onChange={(author) => update({ ...item, author })} /></Field>
              <Field label="Role"><TextInput value={item.role} onChange={(role) => update({ ...item, role })} /></Field>
              <Field label="Company" seoPath="testimonials.company"><TextInput value={item.company} onChange={(company) => update({ ...item, company })} /></Field>
              <Field label="Rating"><NumberInput value={item.rating} onChange={(rating) => update({ ...item, rating })} /></Field>
              <Field label="Quote" seoPath="testimonials.quote"><TextArea value={item.quote} onChange={(quote) => update({ ...item, quote })} /></Field>
              <Field label="Avatar"><ImageField value={item.avatar} onChange={(avatar) => update({ ...item, avatar })} /></Field>
            </Grid>
          )}
        />
      </Panel>
      <SaveBar saving={form.saving} onSave={() => void form.save()} />
    </div>
  );
}

export function ContactForm({ initial }: { initial: PortfolioContent["contact"] }) {
  const form = useSectionForm(initial, (contact) => ({ contact }));

  return (
    <div className="space-y-5">
      <PageIntro title="Contact" copy="Section copy, form placeholders, and inquiry presets." />
      <Notice status={form.status} />
      <SectionCopyFields value={form.value.section} onChange={(section) => form.setValue({ ...form.value, section })} />
      <Panel title="Form copy">
        <Grid>
          <Field label="Availability"><TextInput value={form.value.availability} onChange={(availability) => form.setValue({ ...form.value, availability })} /></Field>
          <Field label="Dubai time label"><TextInput value={form.value.dubaiTimeLabel} onChange={(dubaiTimeLabel) => form.setValue({ ...form.value, dubaiTimeLabel })} /></Field>
          <Field label="Default subject"><TextInput value={form.value.defaultSubject} onChange={(defaultSubject) => form.setValue({ ...form.value, defaultSubject })} /></Field>
          <Field label="Name placeholder"><TextInput value={form.value.formNamePlaceholder} onChange={(formNamePlaceholder) => form.setValue({ ...form.value, formNamePlaceholder })} /></Field>
          <Field label="Email placeholder"><TextInput value={form.value.formEmailPlaceholder} onChange={(formEmailPlaceholder) => form.setValue({ ...form.value, formEmailPlaceholder })} /></Field>
          <Field label="Message placeholder"><TextArea value={form.value.formMessagePlaceholder} onChange={(formMessagePlaceholder) => form.setValue({ ...form.value, formMessagePlaceholder })} /></Field>
          <Field label="Response SLA"><TextInput value={form.value.responseSla} onChange={(responseSla) => form.setValue({ ...form.value, responseSla })} /></Field>
        </Grid>
      </Panel>
      <Panel title="Presets">
        <CollectionEditor
          title="Inquiry templates"
          items={form.value.presets}
          onChange={(presets) => form.setValue({ ...form.value, presets })}
          createItem={() => ({ label: "New preset", text: "" })}
          renderItem={(item, _index, update) => (
            <Grid>
              <Field label="Label"><TextInput value={item.label} onChange={(label) => update({ ...item, label })} /></Field>
              <Field label="Message"><TextArea value={item.text} onChange={(text) => update({ ...item, text })} /></Field>
            </Grid>
          )}
        />
      </Panel>
      <SaveBar saving={form.saving} onSave={() => void form.save()} />
    </div>
  );
}
