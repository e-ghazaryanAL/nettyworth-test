import mixpanel, { Dict } from 'mixpanel-browser';

mixpanel.init('21102eb03ab4d11c9e180b8fcdc80c86', { debug: true, ignore_dnt: true });

const actions = {
  indentify: (connector: string) => {
    mixpanel.identify(connector);
  },
  track: (name: string, props?: Dict) => {
    mixpanel.track(name, props);
  },
  registerOnce: (props: Dict) => {
    mixpanel.register_once(props);
  },
  increment: (property: string) => {
    const val = mixpanel.get_property(property);

    const update: { [key: string]: number | string } = {
      current_page_name: window.location.href,
      previous_page_name: document.referrer,
    };
    if (val) {
      update[property] = val + 1;
    }
    mixpanel.register(update);
  },
  setProperty: (props: Dict) => {
    mixpanel.people.set(props);
  },
  reset: () => {
    mixpanel.reset();
  },
};

export const Mixpanel = actions;
