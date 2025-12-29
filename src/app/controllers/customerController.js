import Customer from '../models/Customer.js';

class CustomerController {

    async index(req, res) {
        const customers = await Customer.findAll({
            limit: 1000,
        });
        return res.json(customers);
    }

    async show(req, res) {
        const { id } = req.params;

        const customer = await Customer.findByPk(id);

        if(!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        return res.json(customer);
    }

    async create(req, res) {
        const { name, email } = req.body;
        
        const customerExists = await Customer.findOne({ 
            where: { email },
        });

        if (customerExists) {
            return res.status(400).json({ error: 'Customer already exists.' });
        }

        const customer = await Customer.create({ 
            name, 
            email,
        });

        return res.status(201).json(customer);
    }

    async update(req, res) {
        const { id } = req.params;
        const { name, email } = req.body;

        const customer = await Customer.findByPk(id);

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        await customer.update({ name, email });

        return res.json(customer);
    }

    async destroy(req, res) {
        const { id } = req.params;

        const customer = await Customer.findByPk(id);

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        await customer.destroy();

        return res.status(204).send();
    }
}

export default new CustomerController();