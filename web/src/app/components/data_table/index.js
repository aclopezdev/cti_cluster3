exports.Data_table = new Class(
    {
        Extends: Rapp,
        initialize: function(args)
        {
            this.parent(args, this);
        },
        run: function(props)
        {
            // THIS METHOD RUN WHEN THE RENDER FINISH
        },
        states: function(props)
        {
            this.state('header_buffer', []);
            this.state('line_buffer', []);
            this.state('data_buffer', []);
        },
        actions: function(props)
        {
            this.action('set_data', (args)=>
            {
                for(let h in args.header)
                {
                    if(!args.header.hasOwnProperty(h)) continue;
                    this.state('header_buffer', [...this.state('header_buffer'), { k: h, v: args.header[h] }]);
                }
                for(let d of args.data)
                {
                    const buffer = [];
                    for(let h in args.header)
                    {
                        if(!args.header.hasOwnProperty(h)) continue;
                        buffer.push({ k: d[args.key], v: d[h] });
                    }
                    this.state('data_buffer', [...this.state('data_buffer'), buffer]);
                    this.state('line_buffer', [...this.state('line_buffer'), { k: d[args.key], b: buffer }]);
                }
            });
        },
        draw: function(props)
        {
            //this._dom.iterator.test = `<a href='javascript:;'>item [k]</a>`;
            this._dom.iterator.header = `<th key='[k]'>[v]</th>`;
            this._dom.iterator.data_line = `<tr foreach='[data_buffer:data]'></tr>`;
            this._dom.iterator.data = `<tr id='[k]'><td>[v]</td></tr>`;

            this._dom.style = `
            .${this._name}-main > table
            {
                border-collapse: collapse;
                width: 100%;
            }
            .${this._name}-main > table > tr:nth-child(even)
            {
                background-color: #DDD;
            }
            .${this._name}-main > table > tr > th
            {
                font-weight: bold;
            }
            `;

            this._dom.main = (
                `<section classComp='${this._name}'>
                    <table>
                        <tr foreach='[header_buffer:header]'></tr>
                        <tbody foreach='[line_buffer:data_line]'></tbody>
                    </table>
                </section>`
            );
        }
    }
);