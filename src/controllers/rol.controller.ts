import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Rol} from '../models';
import {RolRepository} from '../repositories';

export class RolController {
  constructor(
    @repository(RolRepository)
    public rolRepository : RolRepository,
  ) {}

  @post('/rols', {
    responses: {
      '200': {
        description: 'Rol model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rol)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {
            title: 'NewRol',
            exclude: ['idrol'],
          }),
        },
      },
    })
    rol: Omit<Rol, 'idrol'>,
  ): Promise<Rol> {
    return this.rolRepository.create(rol);
  }

  @get('/rols/count', {
    responses: {
      '200': {
        description: 'Rol model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Rol)) where?: Where<Rol>,
  ): Promise<Count> {
    return this.rolRepository.count(where);
  }

  @get('/rols', {
    responses: {
      '200': {
        description: 'Array of Rol model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rol)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Rol)) filter?: Filter<Rol>,
  ): Promise<Rol[]> {
    return this.rolRepository.find(filter);
  }

  @patch('/rols', {
    responses: {
      '200': {
        description: 'Rol PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {partial: true}),
        },
      },
    })
    rol: Rol,
    @param.query.object('where', getWhereSchemaFor(Rol)) where?: Where<Rol>,
  ): Promise<Count> {
    return this.rolRepository.updateAll(rol, where);
  }

  @get('/rols/{id}', {
    responses: {
      '200': {
        description: 'Rol model instance',
        content: {'application/json': {schema: getModelSchemaRef(Rol)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Rol> {
    return this.rolRepository.findById(id);
  }

  @patch('/rols/{id}', {
    responses: {
      '204': {
        description: 'Rol PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Rol, {partial: true}),
        },
      },
    })
    rol: Rol,
  ): Promise<void> {
    await this.rolRepository.updateById(id, rol);
  }

  @put('/rols/{id}', {
    responses: {
      '204': {
        description: 'Rol PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() rol: Rol,
  ): Promise<void> {
    await this.rolRepository.replaceById(id, rol);
  }

  @del('/rols/{id}', {
    responses: {
      '204': {
        description: 'Rol DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.rolRepository.deleteById(id);
  }
}
